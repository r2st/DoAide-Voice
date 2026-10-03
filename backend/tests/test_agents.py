from __future__ import annotations


def test_create_agent(auth_client):
    resp = auth_client.post(
        "/api/v1/agents",
        json={
            "name": "Sales Bot",
            "personality": "Friendly and professional",
            "greeting": "Hello! How can I help you today?",
            "voice_type": "female",
            "language": "en",
        },
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["name"] == "Sales Bot"
    assert data["status"] == "draft"


def test_list_agents(auth_client):
    auth_client.post("/api/v1/agents", json={"name": "Agent 1"})
    auth_client.post("/api/v1/agents", json={"name": "Agent 2"})
    resp = auth_client.get("/api/v1/agents")
    assert resp.status_code == 200
    assert len(resp.json()) == 2


def test_get_agent(auth_client):
    create = auth_client.post("/api/v1/agents", json={"name": "My Agent"})
    agent_id = create.json()["id"]
    resp = auth_client.get(f"/api/v1/agents/{agent_id}")
    assert resp.status_code == 200
    assert resp.json()["name"] == "My Agent"


def test_update_agent(auth_client):
    create = auth_client.post("/api/v1/agents", json={"name": "Old Name"})
    agent_id = create.json()["id"]
    resp = auth_client.patch(f"/api/v1/agents/{agent_id}", json={"name": "New Name"})
    assert resp.status_code == 200
    assert resp.json()["name"] == "New Name"


def test_delete_agent(auth_client):
    create = auth_client.post("/api/v1/agents", json={"name": "Delete Me"})
    agent_id = create.json()["id"]
    resp = auth_client.delete(f"/api/v1/agents/{agent_id}")
    assert resp.status_code == 204
    resp = auth_client.get(f"/api/v1/agents/{agent_id}")
    assert resp.status_code == 404


def test_agent_not_found(auth_client):
    resp = auth_client.get("/api/v1/agents/9999")
    assert resp.status_code == 404
