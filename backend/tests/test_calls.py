from __future__ import annotations

from app.models.call import Call, CallDirection, CallStatus


def test_list_calls_empty(auth_client):
    resp = auth_client.get("/api/v1/calls")
    assert resp.status_code == 200
    data = resp.json()
    assert data["calls"] == []
    assert data["total"] == 0


def test_list_calls_with_data(auth_client, db_session):
    from app.models.business import Business

    biz = db_session.query(Business).first()
    call = Call(
        business_id=biz.id,
        direction=CallDirection.INBOUND,
        status=CallStatus.COMPLETED,
        from_number="+1234567890",
        to_number="+0987654321",
        duration_seconds=120.0,
    )
    db_session.add(call)
    db_session.commit()

    resp = auth_client.get("/api/v1/calls")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 1
    assert data["calls"][0]["direction"] == "inbound"


def test_get_call_detail(auth_client, db_session):
    from app.models.business import Business
    from app.models.call_transcript import CallTranscript

    biz = db_session.query(Business).first()
    call = Call(
        business_id=biz.id,
        direction=CallDirection.OUTBOUND,
        status=CallStatus.COMPLETED,
    )
    db_session.add(call)
    db_session.flush()

    transcript = CallTranscript(call_id=call.id, speaker="agent", content="Hello!", sequence=0)
    db_session.add(transcript)
    db_session.commit()

    resp = auth_client.get(f"/api/v1/calls/{call.id}")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["transcript"]) == 1
    assert data["transcript"][0]["content"] == "Hello!"
