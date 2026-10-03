from __future__ import annotations

from enum import Enum

from sqlalchemy import Enum as SAEnum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import BusinessScopedMixin, TimestampMixin


class CampaignStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"


class ContactStatus(str, Enum):
    PENDING = "pending"
    CALLED = "called"
    ANSWERED = "answered"
    NO_ANSWER = "no_answer"
    FAILED = "failed"


class Campaign(Base, TimestampMixin, BusinessScopedMixin):
    __tablename__ = "campaigns"

    id: Mapped[int] = mapped_column(primary_key=True)
    agent_id: Mapped[int] = mapped_column(
        ForeignKey("voice_agents.id", ondelete="CASCADE"), nullable=False, index=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[CampaignStatus] = mapped_column(
        SAEnum(CampaignStatus, native_enum=False, length=20),
        default=CampaignStatus.DRAFT, nullable=False
    )
    total_contacts: Mapped[int] = mapped_column(default=0, nullable=False)
    contacted: Mapped[int] = mapped_column(default=0, nullable=False)
    answered: Mapped[int] = mapped_column(default=0, nullable=False)


class CampaignContact(Base, TimestampMixin):
    __tablename__ = "campaign_contacts"

    id: Mapped[int] = mapped_column(primary_key=True)
    campaign_id: Mapped[int] = mapped_column(
        ForeignKey("campaigns.id", ondelete="CASCADE"), nullable=False, index=True
    )
    name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[ContactStatus] = mapped_column(
        SAEnum(ContactStatus, native_enum=False, length=20),
        default=ContactStatus.PENDING, nullable=False
    )
    call_id: Mapped[int | None] = mapped_column(
        ForeignKey("calls.id", ondelete="SET NULL"), nullable=True
    )
