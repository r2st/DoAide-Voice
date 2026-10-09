from __future__ import annotations

from fastapi import APIRouter

from app.schemas.tools import ScriptRequest
from app.services import gemini_client

router = APIRouter(tags=["tools"])

_SYSTEM_PROMPT = (
    "You are an expert at writing professional voice agent scripts for businesses. "
    "Generate a complete, ready-to-use call script with clear sections: Greeting, "
    "Main Flow (with branching for common responses), and Closing. Use placeholders "
    "like [Name], [Company] where appropriate. Keep it conversational and natural."
)

_FALLBACK_SCRIPT = """Agent: "Hello, thank you for calling {company}. My name is your AI assistant. How can I help you today?"

[Listen to caller]

Agent: "I understand. Let me help you with that right away."

For general inquiries:
Agent: "I'd be happy to provide that information. [Provide relevant details from knowledge base]."

For complaints:
Agent: "I'm sorry to hear about that experience. Let me make a note and ensure someone from our team follows up with you within 24 hours."

For transfers:
Agent: "Let me connect you with the right department. One moment please."

Closing:
Agent: "Is there anything else I can help you with today? Thank you for calling {company}. Have a great day!"
"""


@router.post("/tools/generate-script")
async def generate_script(req: ScriptRequest) -> dict:
    prompt = (
        f"Write a voice agent call script for a {req.industry} company called '{req.company_name}'. "
        f"The scenario is: {req.scenario}. The tone should be {req.tone}. "
        f"Include greeting, main conversation flow with branching, and closing."
    )

    script = await gemini_client.generate(prompt, system_prompt=_SYSTEM_PROMPT)

    if not script:
        script = _FALLBACK_SCRIPT.replace("{company}", req.company_name)

    return {"script": script, "industry": req.industry, "scenario": req.scenario}
