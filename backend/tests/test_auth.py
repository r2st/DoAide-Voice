from __future__ import annotations

from tests.conftest import _register


def test_register(client):
    data = _register(client)
    assert "access_token" in data
    assert data["user"]["email"] == "test@example.com"
    assert data["business"]["name"] == "Test Biz"


def test_register_duplicate(client):
    _register(client)
    resp = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "Test1234!",
            "full_name": "Test",
            "business_name": "Biz",
            "industry": "tech",
        },
    )
    assert resp.status_code == 409


def test_login(client):
    _register(client)
    resp = client.post(
        "/api/v1/auth/login",
        data={"username": "test@example.com", "password": "Test1234!"},
    )
    assert resp.status_code == 200
    assert "access_token" in resp.json()


def test_login_wrong_password(client):
    _register(client)
    resp = client.post(
        "/api/v1/auth/login",
        data={"username": "test@example.com", "password": "wrong"},
    )
    assert resp.status_code == 401


def test_me(auth_client):
    resp = auth_client.get("/api/v1/auth/me")
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == "test@example.com"
    assert "business" in data


def test_me_unauthenticated(client):
    resp = client.get("/api/v1/auth/me")
    assert resp.status_code == 401
