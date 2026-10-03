from __future__ import annotations


def _create_agent(auth_client):
    resp = auth_client.post("/api/v1/agents", json={"name": "Campaign Agent"})
    return resp.json()["id"]


def test_create_campaign(auth_client):
    agent_id = _create_agent(auth_client)
    resp = auth_client.post(
        "/api/v1/campaigns",
        json={"name": "Spring Sale", "agent_id": agent_id, "description": "Q2 outreach"},
    )
    assert resp.status_code == 201
    assert resp.json()["name"] == "Spring Sale"


def test_list_campaigns(auth_client):
    agent_id = _create_agent(auth_client)
    auth_client.post("/api/v1/campaigns", json={"name": "C1", "agent_id": agent_id})
    auth_client.post("/api/v1/campaigns", json={"name": "C2", "agent_id": agent_id})
    resp = auth_client.get("/api/v1/campaigns")
    assert resp.status_code == 200
    assert len(resp.json()) == 2


def test_add_contact(auth_client):
    agent_id = _create_agent(auth_client)
    campaign = auth_client.post(
        "/api/v1/campaigns", json={"name": "C", "agent_id": agent_id}
    ).json()
    resp = auth_client.post(
        f"/api/v1/campaigns/{campaign['id']}/contacts",
        json={"name": "John", "phone_number": "+1234567890"},
    )
    assert resp.status_code == 201
    assert resp.json()["name"] == "John"


def test_list_contacts(auth_client):
    agent_id = _create_agent(auth_client)
    campaign = auth_client.post(
        "/api/v1/campaigns", json={"name": "C", "agent_id": agent_id}
    ).json()
    cid = campaign["id"]
    auth_client.post(f"/api/v1/campaigns/{cid}/contacts", json={"name": "A", "phone_number": "+1"})
    auth_client.post(f"/api/v1/campaigns/{cid}/contacts", json={"name": "B", "phone_number": "+2"})
    resp = auth_client.get(f"/api/v1/campaigns/{cid}/contacts")
    assert resp.status_code == 200
    assert len(resp.json()) == 2
