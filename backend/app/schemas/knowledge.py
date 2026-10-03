from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class KnowledgeDocOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    business_id: int
    agent_id: int | None = None
    title: str
    filename: str
    file_size: int
    mime_type: str
    created_at: datetime
