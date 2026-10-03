from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.campaign import Campaign, CampaignContact
from app.models.user import User
from app.models.voice_agent import VoiceAgent
from app.schemas.campaign import (
    CampaignCreate,
    CampaignOut,
    CampaignUpdate,
    ContactCreate,
    ContactOut,
)

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("", response_model=list[CampaignOut])
def list_campaigns(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> list[CampaignOut]:
    campaigns = db.scalars(
        select(Campaign)
        .where(Campaign.business_id == current_user.business_id)
        .order_by(Campaign.created_at.desc())
    ).all()
    return [CampaignOut.model_validate(c) for c in campaigns]


@router.post("", response_model=CampaignOut, status_code=status.HTTP_201_CREATED)
def create_campaign(
    payload: CampaignCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CampaignOut:
    agent = db.get(VoiceAgent, payload.agent_id)
    if agent is None or agent.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Agent not found")
    campaign = Campaign(
        business_id=current_user.business_id,
        agent_id=payload.agent_id,
        name=payload.name,
        description=payload.description,
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return CampaignOut.model_validate(campaign)


@router.get("/{campaign_id}", response_model=CampaignOut)
def get_campaign(
    campaign_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CampaignOut:
    campaign = db.get(Campaign, campaign_id)
    if campaign is None or campaign.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return CampaignOut.model_validate(campaign)


@router.patch("/{campaign_id}", response_model=CampaignOut)
def update_campaign(
    campaign_id: int,
    payload: CampaignUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CampaignOut:
    campaign = db.get(Campaign, campaign_id)
    if campaign is None or campaign.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Campaign not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(campaign, key, value)
    db.commit()
    db.refresh(campaign)
    return CampaignOut.model_validate(campaign)


@router.post("/{campaign_id}/contacts", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def add_contact(
    campaign_id: int,
    payload: ContactCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ContactOut:
    campaign = db.get(Campaign, campaign_id)
    if campaign is None or campaign.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Campaign not found")
    contact = CampaignContact(
        campaign_id=campaign_id,
        name=payload.name,
        phone_number=payload.phone_number,
        email=payload.email,
    )
    db.add(contact)
    campaign.total_contacts += 1
    db.commit()
    db.refresh(contact)
    return ContactOut.model_validate(contact)


@router.get("/{campaign_id}/contacts", response_model=list[ContactOut])
def list_contacts(
    campaign_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[ContactOut]:
    campaign = db.get(Campaign, campaign_id)
    if campaign is None or campaign.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Campaign not found")
    contacts = db.scalars(
        select(CampaignContact).where(CampaignContact.campaign_id == campaign_id)
    ).all()
    return [ContactOut.model_validate(c) for c in contacts]
