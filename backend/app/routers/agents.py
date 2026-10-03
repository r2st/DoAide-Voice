from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.voice_agent import VoiceAgent
from app.schemas.voice_agent import AgentCreate, AgentOut, AgentUpdate

router = APIRouter(prefix="/agents", tags=["agents"])


@router.get("", response_model=list[AgentOut])
def list_agents(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> list[AgentOut]:
    agents = db.scalars(
        select(VoiceAgent).where(VoiceAgent.business_id == current_user.business_id)
    ).all()
    return [AgentOut.model_validate(a) for a in agents]


@router.post("", response_model=AgentOut, status_code=status.HTTP_201_CREATED)
def create_agent(
    payload: AgentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AgentOut:
    agent = VoiceAgent(
        business_id=current_user.business_id,
        name=payload.name,
        personality=payload.personality,
        script=payload.script,
        greeting=payload.greeting,
        voice_type=payload.voice_type,
        language=payload.language,
    )
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return AgentOut.model_validate(agent)


@router.get("/{agent_id}", response_model=AgentOut)
def get_agent(
    agent_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AgentOut:
    agent = db.get(VoiceAgent, agent_id)
    if agent is None or agent.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Agent not found")
    return AgentOut.model_validate(agent)


@router.patch("/{agent_id}", response_model=AgentOut)
def update_agent(
    agent_id: int,
    payload: AgentUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AgentOut:
    agent = db.get(VoiceAgent, agent_id)
    if agent is None or agent.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Agent not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(agent, key, value)
    db.commit()
    db.refresh(agent)
    return AgentOut.model_validate(agent)


@router.delete("/{agent_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
def delete_agent(
    agent_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Response:
    agent = db.get(VoiceAgent, agent_id)
    if agent is None or agent.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Agent not found")
    db.delete(agent)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
