from __future__ import annotations

import logging

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)


def is_configured() -> bool:
    return bool(settings.openrouter_api_key)


async def chat(messages: list[dict], system_prompt: str | None = None) -> str:
    if not is_configured():
        return ""

    all_messages = []
    if system_prompt:
        all_messages.append({"role": "system", "content": system_prompt})
    all_messages.extend(messages)

    for attempt in range(settings.openrouter_max_attempts):
        try:
            async with httpx.AsyncClient(timeout=settings.openrouter_timeout_seconds) as client:
                response = await client.post(
                    f"{settings.openrouter_base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.openrouter_api_key}",
                        "HTTP-Referer": "https://voice.doaide.com",
                        "X-Title": "DoAide Voice",
                    },
                    json={
                        "model": settings.openrouter_model,
                        "messages": all_messages,
                        "max_tokens": 500,
                        "temperature": 0.7,
                    },
                )
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            if response.status_code in (429, 408, 502, 503, 504) and attempt < settings.openrouter_max_attempts - 1:
                continue
            logger.warning("OpenRouter returned %d: %s", response.status_code, response.text[:200])
            return ""
        except httpx.HTTPError as exc:
            logger.warning("OpenRouter request failed (attempt %d): %s", attempt + 1, exc)
            if attempt == settings.openrouter_max_attempts - 1:
                return ""
    return ""
