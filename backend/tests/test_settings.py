from __future__ import annotations


def test_get_twilio_settings(auth_client):
    resp = auth_client.get("/api/v1/settings/twilio")
    assert resp.status_code == 200
    data = resp.json()
    assert data["twilio_account_sid"] is None


def test_update_profile(auth_client):
    resp = auth_client.patch("/api/v1/settings/profile", json={"full_name": "Updated Name"})
    assert resp.status_code == 200

    me = auth_client.get("/api/v1/auth/me").json()
    assert me["full_name"] == "Updated Name"
