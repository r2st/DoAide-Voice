from __future__ import annotations

import logging

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"


def is_configured() -> bool:
    return bool(settings.gemini_api_key)


async def generate(prompt: str, system_prompt: str | None = None) -> str:
    if not is_configured():
        return ""

    url = f"{_BASE_URL}/{settings.gemini_model}:generateContent?key={settings.gemini_api_key}"

    body: dict = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1500,
        },
    }
    if system_prompt:
        body["systemInstruction"] = {"parts": [{"text": system_prompt}]}

    for attempt in range(settings.gemini_max_attempts):
        try:
            async with httpx.AsyncClient(timeout=settings.gemini_timeout_seconds) as client:
                response = await client.post(url, json=body)
            if response.status_code == 200:
                data = response.json()
                return data["candidates"][0]["content"]["parts"][0]["text"]
            if response.status_code in (429, 408, 502, 503, 504) and attempt < settings.gemini_max_attempts - 1:
                continue
            logger.warning("Gemini returned %d: %s", response.status_code, response.text[:200])
            return ""
        except httpx.HTTPError as exc:
            logger.warning("Gemini request failed (attempt %d): %s", attempt + 1, exc)
            if attempt == settings.gemini_max_attempts - 1:
                return ""
    return ""
