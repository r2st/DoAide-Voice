from __future__ import annotations


def test_analytics_empty(auth_client):
    resp = auth_client.get("/api/v1/analytics")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_calls"] == 0
    assert data["conversion_rate"] == 0.0


def test_usage_empty(auth_client):
    resp = auth_client.get("/api/v1/analytics/usage")
    assert resp.status_code == 200
    data = resp.json()
    assert data["minutes_used"] == 0.0
    assert data["minutes_limit"] == 50
