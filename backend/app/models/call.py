from __future__ import annotations

from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SAEnum, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import BusinessScopedMixin, TimestampMixin


class CallDirection(str, Enum):
    INBOUND = "inbound"
    OUTBOUND = "outbound"


class CallStatus(str, Enum):
    QUEUED = "queued"
    RINGING = "ringing"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    NO_ANSWER = "no_answer"
    BUSY = "busy"


class SentimentScore(str, Enum):
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"


class Call(Base, TimestampMixin, BusinessScopedMixin):
    __tablename__ = "calls"

    id: Mapped[int] = mapped_column(primary_key=True)
    agent_id: Mapped[int] = mapped_column(
        ForeignKey("voice_agents.id", ondelete="SET NULL"), nullable=True, index=True
    )
    campaign_id: Mapped[int | None] = mapped_column(
        ForeignKey("campaigns.id", ondelete="SET NULL"), nullable=True, index=True
    )
    twilio_call_sid: Mapped[str | None] = mapped_column(String(64), unique=True, nullable=True)
    direction: Mapped[CallDirection] = mapped_column(
        SAEnum(CallDirection, native_enum=False, length=20), nullable=False
    )
    status: Mapped[CallStatus] = mapped_column(
        SAEnum(CallStatus, native_enum=False, length=20),
        default=CallStatus.QUEUED, nullable=False
    )
    from_number: Mapped[str | None] = mapped_column(String(20), nullable=True)
    to_number: Mapped[str | None] = mapped_column(String(20), nullable=True)
    duration_seconds: Mapped[float | None] = mapped_column(Float, nullable=True)
    recording_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    sentiment: Mapped[SentimentScore | None] = mapped_column(
        SAEnum(SentimentScore, native_enum=False, length=20), nullable=True
    )
    converted: Mapped[bool] = mapped_column(default=False, nullable=False)
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    ended_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
