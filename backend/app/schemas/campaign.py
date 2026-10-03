from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.campaign import CampaignStatus, ContactStatus


class CampaignCreate(BaseModel):
    agent_id: int
    name: str = Field(max_length=255)
    description: str | None = None


class CampaignUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=255)
    description: str | None = None
    status: CampaignStatus | None = None


class CampaignOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    business_id: int
    agent_id: int
    name: str
    description: str | None = None
    status: CampaignStatus
    total_contacts: int
    contacted: int
    answered: int
    created_at: datetime
    updated_at: datetime


class ContactCreate(BaseModel):
    name: str | None = Field(default=None, max_length=255)
    phone_number: str = Field(max_length=20)
    email: str | None = Field(default=None, max_length=255)


class ContactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    campaign_id: int
    name: str | None = None
    phone_number: str
    email: str | None = None
    status: ContactStatus
    call_id: int | None = None
    created_at: datetime
