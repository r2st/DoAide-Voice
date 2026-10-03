from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.call import CallDirection, CallStatus, SentimentScore


class CallOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    business_id: int
    agent_id: int | None = None
    campaign_id: int | None = None
    twilio_call_sid: str | None = None
    direction: CallDirection
    status: CallStatus
    from_number: str | None = None
    to_number: str | None = None
    duration_seconds: float | None = None
    recording_url: str | None = None
    sentiment: SentimentScore | None = None
    converted: bool
    started_at: datetime | None = None
    ended_at: datetime | None = None
    created_at: datetime


class CallList(BaseModel):
    calls: list[CallOut]
    total: int


class TranscriptEntry(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    speaker: str
    content: str
    sequence: int


class CallDetail(CallOut):
    transcript: list[TranscriptEntry] = []


class OutboundCallRequest(BaseModel):
    agent_id: int
    to_number: str = Field(max_length=20)
