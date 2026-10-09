from __future__ import annotations

from pydantic import BaseModel, Field


class ScriptRequest(BaseModel):
    industry: str = Field(..., min_length=1, max_length=100)
    scenario: str = Field(..., min_length=1, max_length=100)
    tone: str = Field(default="professional", max_length=50)
    company_name: str = Field(default="Your Company", max_length=200)
