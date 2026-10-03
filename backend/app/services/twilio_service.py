from __future__ import annotations

import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


def is_configured() -> bool:
    return bool(settings.twilio_account_sid and settings.twilio_auth_token)


def generate_twiml_response(text: str, gather: bool = True) -> str:
    twiml_parts = ['<?xml version="1.0" encoding="UTF-8"?>', "<Response>"]
    if gather:
        twiml_parts.append(
            '<Gather input="speech" action="/api/v1/twilio/gather" method="POST" '
            'speechTimeout="auto" language="en-US">'
        )
        twiml_parts.append(f"<Say>{_escape_xml(text)}</Say>")
        twiml_parts.append("</Gather>")
        twiml_parts.append("<Say>I didn't hear anything. Goodbye.</Say>")
    else:
        twiml_parts.append(f"<Say>{_escape_xml(text)}</Say>")
    twiml_parts.append("</Response>")
    return "\n".join(twiml_parts)


def generate_twiml_hangup(text: str | None = None) -> str:
    twiml_parts = ['<?xml version="1.0" encoding="UTF-8"?>', "<Response>"]
    if text:
        twiml_parts.append(f"<Say>{_escape_xml(text)}</Say>")
    twiml_parts.append("<Hangup/>")
    twiml_parts.append("</Response>")
    return "\n".join(twiml_parts)


def _escape_xml(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
