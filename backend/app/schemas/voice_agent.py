from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.voice_agent import AgentStatus, VoiceType


class AgentCreate(BaseModel):
    name: str = Field(max_length=255)
    personality: str | None = None
    script: str | None = None
    greeting: str | None = Field(default=None, max_length=500)
    voice_type: VoiceType = VoiceType.FEMALE
    language: str = Field(default="en-US", max_length=10)


class AgentUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=255)
    personality: str | None = None
    script: str | None = None
    greeting: str | None = Field(default=None, max_length=500)
    voice_type: VoiceType | None = None
    language: str | None = Field(default=None, max_length=10)
    status: AgentStatus | None = None


class AgentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    business_id: int
    name: str
    personality: str | None = None
    script: str | None = None
    greeting: str | None = None
    voice_type: VoiceType
    language: str
    status: AgentStatus
    phone_number: str | None = None
    created_at: datetime
    updated_at: datetime
