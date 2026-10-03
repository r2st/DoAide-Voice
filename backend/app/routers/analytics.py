from __future__ import annotations

from datetime import UTC, datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.call import Call, CallDirection, CallStatus, SentimentScore
from app.models.usage_tracking import UsageTracking
from app.models.user import User
from app.schemas.analytics import AnalyticsOverview, UsageOut

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("", response_model=AnalyticsOverview)
def get_analytics(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> AnalyticsOverview:
    biz = current_user.business_id
    base = select(Call).where(Call.business_id == biz)

    total = db.scalar(select(func.count(Call.id)).where(Call.business_id == biz)) or 0
    total_dur = db.scalar(
        select(func.coalesce(func.sum(Call.duration_seconds), 0.0)).where(Call.business_id == biz)
    ) or 0.0
    completed = db.scalar(
        select(func.count(Call.id)).where(Call.business_id == biz, Call.status == CallStatus.COMPLETED)
    ) or 0
    inbound = db.scalar(
        select(func.count(Call.id)).where(Call.business_id == biz, Call.direction == CallDirection.INBOUND)
    ) or 0
    outbound = db.scalar(
        select(func.count(Call.id)).where(Call.business_id == biz, Call.direction == CallDirection.OUTBOUND)
    ) or 0
    positive = db.scalar(
        select(func.count(Call.id)).where(Call.business_id == biz, Call.sentiment == SentimentScore.POSITIVE)
    ) or 0
    neutral = db.scalar(
        select(func.count(Call.id)).where(Call.business_id == biz, Call.sentiment == SentimentScore.NEUTRAL)
    ) or 0
    negative = db.scalar(
        select(func.count(Call.id)).where(Call.business_id == biz, Call.sentiment == SentimentScore.NEGATIVE)
    ) or 0
    conversions = db.scalar(
        select(func.count(Call.id)).where(Call.business_id == biz, Call.converted.is_(True))
    ) or 0

    return AnalyticsOverview(
        total_calls=total,
        total_duration_minutes=round(float(total_dur) / 60, 2),
        avg_duration_seconds=round(float(total_dur) / total, 1) if total > 0 else 0.0,
        inbound_calls=inbound,
        outbound_calls=outbound,
        completed_calls=completed,
        positive_sentiment=positive,
        neutral_sentiment=neutral,
        negative_sentiment=negative,
        conversion_rate=round(conversions / total * 100, 1) if total > 0 else 0.0,
        conversions=conversions,
    )


@router.get("/usage", response_model=UsageOut)
def get_usage(
    period: str = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UsageOut:
    if period is None:
        period = datetime.now(UTC).strftime("%Y-%m")

    usage = db.scalar(
        select(UsageTracking).where(
            UsageTracking.business_id == current_user.business_id,
            UsageTracking.period == period,
        )
    )
    minutes_limit = settings.free_tier_minutes
    if usage:
        return UsageOut(
            period=period,
            minutes_used=usage.minutes_used,
            minutes_limit=minutes_limit,
            calls_made=usage.calls_made,
            calls_received=usage.calls_received,
            percent_used=round(usage.minutes_used / minutes_limit * 100, 1) if minutes_limit > 0 else 0.0,
        )
    return UsageOut(
        period=period,
        minutes_used=0.0,
        minutes_limit=minutes_limit,
        calls_made=0,
        calls_received=0,
        percent_used=0.0,
    )
