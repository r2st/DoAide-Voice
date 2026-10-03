from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.voice_agent import VoiceAgent


class BusinessPlan(str, Enum):
    FREE = "free"
    PRO = "pro"
    ENTERPRISE = "enterprise"


class Business(Base, TimestampMixin):
    __tablename__ = "businesses"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    industry: Mapped[str | None] = mapped_column(String(100), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    website: Mapped[str | None] = mapped_column(String(500), nullable=True)
    plan: Mapped[BusinessPlan] = mapped_column(
        SAEnum(BusinessPlan, native_enum=False, length=20),
        default=BusinessPlan.FREE, nullable=False
    )
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    twilio_account_sid: Mapped[str | None] = mapped_column(String(255), nullable=True)
    twilio_auth_token: Mapped[str | None] = mapped_column(String(255), nullable=True)
    twilio_phone_number: Mapped[str | None] = mapped_column(String(20), nullable=True)

    users: Mapped[list[User]] = relationship(back_populates="business")
    voice_agents: Mapped[list[VoiceAgent]] = relationship(back_populates="business")
