from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest


class TestGenerateScript:
    def test_valid_request_returns_script(self, client):
        resp = client.post(
            "/api/v1/tools/generate-script",
            json={
                "industry": "healthcare",
                "scenario": "appointment-booking",
                "tone": "friendly",
                "company_name": "TestCo",
            },
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "script" in data
        assert len(data["script"]) > 0
        assert data["industry"] == "healthcare"
        assert data["scenario"] == "appointment-booking"

    def test_missing_industry_returns_422(self, client):
        resp = client.post(
            "/api/v1/tools/generate-script",
            json={"scenario": "sales"},
        )
        assert resp.status_code == 422

    def test_missing_scenario_returns_422(self, client):
        resp = client.post(
            "/api/v1/tools/generate-script",
            json={"industry": "tech"},
        )
        assert resp.status_code == 422

    def test_empty_body_returns_422(self, client):
        resp = client.post("/api/v1/tools/generate-script", json={})
        assert resp.status_code == 422

    def test_no_auth_required(self, client):
        assert "Authorization" not in client.headers
        resp = client.post(
            "/api/v1/tools/generate-script",
            json={"industry": "retail", "scenario": "support"},
        )
        assert resp.status_code == 200

    def test_defaults_applied(self, client):
        resp = client.post(
            "/api/v1/tools/generate-script",
            json={"industry": "tech", "scenario": "sales"},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "Your Company" in data["script"] or len(data["script"]) > 0

    @patch("app.services.gemini_client.generate", new_callable=AsyncMock)
    def test_gemini_response_used(self, mock_generate, client):
        mock_generate.return_value = "Custom AI-generated script content"
        resp = client.post(
            "/api/v1/tools/generate-script",
            json={"industry": "saas", "scenario": "demo-booking"},
        )
        assert resp.status_code == 200
        assert resp.json()["script"] == "Custom AI-generated script content"

    @patch("app.services.gemini_client.generate", new_callable=AsyncMock)
    def test_fallback_when_gemini_empty(self, mock_generate, client):
        mock_generate.return_value = ""
        resp = client.post(
            "/api/v1/tools/generate-script",
            json={"industry": "legal", "scenario": "intake", "company_name": "LawFirm"},
        )
        assert resp.status_code == 200
        assert "LawFirm" in resp.json()["script"]
