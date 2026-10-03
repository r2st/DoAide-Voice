from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, Form, Response
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.call import Call, CallDirection
from app.models.call import CallStatus as CallStatusEnum
from app.models.call_transcript import CallTranscript
from app.models.voice_agent import AgentStatus, VoiceAgent
from app.services.twilio_service import generate_twiml_hangup, generate_twiml_response

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/twilio", tags=["twilio"])

_TWILIO_STATUS_MAP = {
    "completed": CallStatusEnum.COMPLETED,
    "failed": CallStatusEnum.FAILED,
    "busy": CallStatusEnum.BUSY,
    "no-answer": CallStatusEnum.NO_ANSWER,
}


@router.post("/voice")
def handle_inbound_call(
    CallSid: str = Form(""),
    From: str = Form(""),
    To: str = Form(""),
    db: Session = Depends(get_db),
) -> Response:
    agent = db.scalar(
        select(VoiceAgent).where(
            VoiceAgent.phone_number == To,
            VoiceAgent.status == AgentStatus.ACTIVE,
        )
    )
    if agent is None:
        twiml = generate_twiml_hangup("Sorry, this number is not configured. Goodbye.")
        return Response(content=twiml, media_type="application/xml")

    call = Call(
        business_id=agent.business_id,
        agent_id=agent.id,
        twilio_call_sid=CallSid,
        direction=CallDirection.INBOUND,
        status=CallStatusEnum.IN_PROGRESS,
        from_number=From,
        to_number=To,
    )
    db.add(call)
    db.commit()

    greeting = agent.greeting or f"Hello, you've reached {agent.name}. How can I help you?"
    entry = CallTranscript(
        call_id=call.id, speaker="agent", content=greeting, sequence=0
    )
    db.add(entry)
    db.commit()

    twiml = generate_twiml_response(greeting)
    return Response(content=twiml, media_type="application/xml")


@router.post("/gather")
def handle_gather(
    CallSid: str = Form(""),
    SpeechResult: str = Form(""),
    db: Session = Depends(get_db),
) -> Response:
    call = db.scalar(select(Call).where(Call.twilio_call_sid == CallSid))
    if call is None:
        twiml = generate_twiml_hangup("Sorry, something went wrong. Goodbye.")
        return Response(content=twiml, media_type="application/xml")

    last_seq = (
        db.scalar(
            select(CallTranscript.sequence)
            .where(CallTranscript.call_id == call.id)
            .order_by(CallTranscript.sequence.desc())
        )
        or 0
    )

    user_entry = CallTranscript(
        call_id=call.id, speaker="caller", content=SpeechResult, sequence=last_seq + 1
    )
    db.add(user_entry)
    db.commit()

    agent_response = "Thank you for your message. Is there anything else I can help with?"

    agent_entry = CallTranscript(
        call_id=call.id, speaker="agent", content=agent_response, sequence=last_seq + 2
    )
    db.add(agent_entry)
    db.commit()

    twiml = generate_twiml_response(agent_response)
    return Response(content=twiml, media_type="application/xml")


@router.post("/status")
def handle_status_callback(
    CallSid: str = Form(""),
    CallStatus: str = Form(""),
    CallDuration: str = Form("0"),
    db: Session = Depends(get_db),
) -> Response:
    call = db.scalar(select(Call).where(Call.twilio_call_sid == CallSid))
    if call is not None:
        mapped = _TWILIO_STATUS_MAP.get(CallStatus)
        if mapped is not None:
            call.status = mapped
        try:
            call.duration_seconds = float(CallDuration)
        except (TypeError, ValueError):
            pass
        db.commit()
    return Response(content="<Response/>", media_type="application/xml")
