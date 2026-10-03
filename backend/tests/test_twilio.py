from __future__ import annotations

from app.models.voice_agent import AgentStatus, VoiceAgent


def test_inbound_no_agent(client, db_session):
    resp = client.post(
        "/api/v1/twilio/voice",
        data={"CallSid": "CA123", "From": "+1111", "To": "+9999"},
    )
    assert resp.status_code == 200
    assert "Goodbye" in resp.text


def test_inbound_with_agent(client, db_session):
    from app.models.business import Business

    biz = Business(name="Test Biz")
    db_session.add(biz)
    db_session.flush()
    agent = VoiceAgent(
        business_id=biz.id,
        name="Inbound Bot",
        phone_number="+5555",
        status=AgentStatus.ACTIVE,
        greeting="Welcome!",
    )
    db_session.add(agent)
    db_session.commit()

    resp = client.post(
        "/api/v1/twilio/voice",
        data={"CallSid": "CA456", "From": "+1111", "To": "+5555"},
    )
    assert resp.status_code == 200
    assert "Welcome!" in resp.text


def test_status_callback(client, db_session):
    resp = client.post(
        "/api/v1/twilio/status",
        data={"CallSid": "CA_UNKNOWN", "CallStatus": "completed", "CallDuration": "60"},
    )
    assert resp.status_code == 200
