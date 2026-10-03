from __future__ import annotations

from sqlalchemy import Float, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import BusinessScopedMixin, TimestampMixin


class UsageTracking(Base, TimestampMixin, BusinessScopedMixin):
    __tablename__ = "usage_tracking"

    id: Mapped[int] = mapped_column(primary_key=True)
    period: Mapped[str] = mapped_column(String(7), nullable=False)
    minutes_used: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    calls_made: Mapped[int] = mapped_column(default=0, nullable=False)
    calls_received: Mapped[int] = mapped_column(default=0, nullable=False)
