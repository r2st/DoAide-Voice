from __future__ import annotations

import os

os.environ.update(
    {
        "DATABASE_URL": "sqlite:///",
        "JWT_SECRET": "test-secret-that-is-long-enough-for-validation",
        "ENVIRONMENT": "test",
        "DEBUG": "true",
        "OPENROUTER_API_KEY": "",
        "TWILIO_ACCOUNT_SID": "",
        "TWILIO_AUTH_TOKEN": "",
    }
)

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import create_app


@pytest.fixture()
def db_session():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    TestSession = sessionmaker(bind=engine)
    session = TestSession()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()


@pytest.fixture()
def client(db_session: Session):
    app = create_app()

    def _override():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _override
    with TestClient(app) as tc:
        yield tc


def _register(client: TestClient, email: str = "test@example.com", password: str = "Test1234!") -> dict:
    resp = client.post(
        "/api/v1/auth/register",
        json={
            "email": email,
            "password": password,
            "full_name": "Test User",
            "business_name": "Test Biz",
            "industry": "tech",
        },
    )
    assert resp.status_code == 201
    return resp.json()


@pytest.fixture()
def auth_client(client: TestClient):
    data = _register(client)
    token = data["access_token"]
    client.headers["Authorization"] = f"Bearer {token}"
    return client
