from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.business import Business
from app.models.user import User

router = APIRouter(prefix="/settings", tags=["settings"])


class TwilioSettings(BaseModel):
    twilio_account_sid: str | None = None
    twilio_auth_token: str | None = None
    twilio_phone_number: str | None = None


class ProfileUpdate(BaseModel):
    full_name: str | None = None
    business_name: str | None = None
    industry: str | None = None


@router.get("/twilio", response_model=TwilioSettings)
def get_twilio_settings(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> TwilioSettings:
    business = db.get(Business, current_user.business_id)
    if business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    return TwilioSettings(
        twilio_account_sid=business.twilio_account_sid,
        twilio_auth_token="***" if business.twilio_auth_token else None,
        twilio_phone_number=business.twilio_phone_number,
    )


@router.put("/twilio", response_model=TwilioSettings)
def update_twilio_settings(
    payload: TwilioSettings,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> TwilioSettings:
    business = db.get(Business, current_user.business_id)
    if business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    if payload.twilio_account_sid is not None:
        business.twilio_account_sid = payload.twilio_account_sid
    if payload.twilio_auth_token is not None and payload.twilio_auth_token != "***":
        business.twilio_auth_token = payload.twilio_auth_token
    if payload.twilio_phone_number is not None:
        business.twilio_phone_number = payload.twilio_phone_number
    db.commit()
    db.refresh(business)
    return TwilioSettings(
        twilio_account_sid=business.twilio_account_sid,
        twilio_auth_token="***" if business.twilio_auth_token else None,
        twilio_phone_number=business.twilio_phone_number,
    )


@router.patch("/profile")
def update_profile(
    payload: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    if payload.full_name is not None:
        current_user.full_name = payload.full_name
    if payload.business_name is not None or payload.industry is not None:
        business = db.get(Business, current_user.business_id)
        if business:
            if payload.business_name is not None:
                business.name = payload.business_name
            if payload.industry is not None:
                business.industry = payload.industry
    db.commit()
    return {"status": "updated"}
