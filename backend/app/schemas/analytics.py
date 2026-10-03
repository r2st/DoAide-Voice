from __future__ import annotations

from pydantic import BaseModel


class AnalyticsOverview(BaseModel):
    total_calls: int = 0
    total_duration_minutes: float = 0.0
    avg_duration_seconds: float = 0.0
    inbound_calls: int = 0
    outbound_calls: int = 0
    completed_calls: int = 0
    positive_sentiment: int = 0
    neutral_sentiment: int = 0
    negative_sentiment: int = 0
    conversion_rate: float = 0.0
    conversions: int = 0


class UsageOut(BaseModel):
    period: str
    minutes_used: float
    minutes_limit: int
    calls_made: int
    calls_received: int
    percent_used: float
