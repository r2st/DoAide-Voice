from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.call import Call
from app.models.call_transcript import CallTranscript
from app.models.user import User
from app.schemas.call import CallDetail, CallList, CallOut, TranscriptEntry

router = APIRouter(prefix="/calls", tags=["calls"])


@router.get("", response_model=CallList)
def list_calls(
    status: str | None = None,
    direction: str | None = None,
    agent_id: int | None = None,
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CallList:
    query = select(Call).where(Call.business_id == current_user.business_id)
    count_query = select(func.count(Call.id)).where(Call.business_id == current_user.business_id)

    if status:
        query = query.where(Call.status == status)
        count_query = count_query.where(Call.status == status)
    if direction:
        query = query.where(Call.direction == direction)
        count_query = count_query.where(Call.direction == direction)
    if agent_id:
        query = query.where(Call.agent_id == agent_id)
        count_query = count_query.where(Call.agent_id == agent_id)

    total = db.scalar(count_query) or 0
    calls = db.scalars(query.order_by(Call.created_at.desc()).limit(limit).offset(offset)).all()
    return CallList(calls=[CallOut.model_validate(c) for c in calls], total=total)


@router.get("/{call_id}", response_model=CallDetail)
def get_call(
    call_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CallDetail:
    call = db.get(Call, call_id)
    if call is None or call.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Call not found")
    transcripts = db.scalars(
        select(CallTranscript)
        .where(CallTranscript.call_id == call_id)
        .order_by(CallTranscript.sequence)
    ).all()
    return CallDetail(
        **CallOut.model_validate(call).model_dump(),
        transcript=[TranscriptEntry.model_validate(t) for t in transcripts],
    )
