from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import BusinessScopedMixin, TimestampMixin

if TYPE_CHECKING:
    from app.models.business import Business


class VoiceType(str, Enum):
    MALE = "male"
    FEMALE = "female"
    NEUTRAL = "neutral"


class AgentStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"


class VoiceAgent(Base, TimestampMixin, BusinessScopedMixin):
    __tablename__ = "voice_agents"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    personality: Mapped[str | None] = mapped_column(Text, nullable=True)
    script: Mapped[str | None] = mapped_column(Text, nullable=True)
    greeting: Mapped[str | None] = mapped_column(String(500), nullable=True)
    voice_type: Mapped[VoiceType] = mapped_column(
        SAEnum(VoiceType, native_enum=False, length=20),
        default=VoiceType.FEMALE, nullable=False
    )
    language: Mapped[str] = mapped_column(String(10), default="en-US", nullable=False)
    status: Mapped[AgentStatus] = mapped_column(
        SAEnum(AgentStatus, native_enum=False, length=20),
        default=AgentStatus.DRAFT, nullable=False
    )
    phone_number: Mapped[str | None] = mapped_column(String(20), nullable=True)

    business: Mapped[Business] = relationship(back_populates="voice_agents")
