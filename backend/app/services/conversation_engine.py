from __future__ import annotations

import logging

from sqlalchemy.orm import Session

from app.models.call_transcript import CallTranscript
from app.models.knowledge_doc import KnowledgeDoc
from app.models.voice_agent import VoiceAgent
from app.services.openrouter_client import chat

logger = logging.getLogger(__name__)


def build_system_prompt(agent: VoiceAgent, knowledge_docs: list[KnowledgeDoc]) -> str:
    parts = [
        f"You are {agent.name}, an AI voice agent for a business.",
        f"Your personality: {agent.personality or 'Professional and helpful.'}",
    ]
    if agent.script:
        parts.append(f"Follow this script as guidance: {agent.script}")
    if knowledge_docs:
        parts.append("Reference knowledge:")
        for doc in knowledge_docs:
            if doc.content_text:
                parts.append(f"--- {doc.title} ---\n{doc.content_text[:2000]}")
    parts.append("Keep responses concise and natural for voice conversation. Max 2-3 sentences.")
    return "\n\n".join(parts)


async def generate_response(
    agent: VoiceAgent,
    transcript_entries: list[CallTranscript],
    user_input: str,
    db: Session,
) -> str:
    knowledge_docs = (
        db.query(KnowledgeDoc)
        .filter(
            KnowledgeDoc.business_id == agent.business_id,
            (KnowledgeDoc.agent_id == agent.id) | (KnowledgeDoc.agent_id.is_(None)),
        )
        .all()
    )

    system_prompt = build_system_prompt(agent, knowledge_docs)
    messages = []
    for entry in transcript_entries:
        role = "assistant" if entry.speaker == "agent" else "user"
        messages.append({"role": role, "content": entry.content})
    messages.append({"role": "user", "content": user_input})

    response = await chat(messages, system_prompt)
    if not response:
        response = "I'm sorry, I didn't catch that. Could you please repeat?"
    return response
