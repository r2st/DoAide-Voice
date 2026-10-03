from __future__ import annotations

from functools import lru_cache

from pydantic import Field, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

_DEFAULT_JWT_SECRET = "change-me-to-a-long-random-string"
_MIN_JWT_SECRET_LENGTH = 32
_PRODUCTION_LIKE = frozenset({"production", "prod", "staging", "stage"})


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = "DoAide Voice"
    app_version: str = "0.1.0"
    environment: str = "development"
    debug: bool = True
    api_v1_prefix: str = "/api/v1"
    backend_cors_origins: str = "http://localhost:5173,http://localhost:3000"
    docs_enabled: bool = True

    log_level: str = "INFO"

    jwt_secret: str = _DEFAULT_JWT_SECRET
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    bcrypt_rounds: int = Field(default=12, ge=4, le=31)

    database_url: str = "postgresql+psycopg://voicebot:voicebot@localhost:5432/voicebot"
    db_pool_size: int = Field(default=10, ge=1, le=100)
    db_max_overflow: int = Field(default=5, ge=0, le=100)
    db_pool_timeout: int = Field(default=30, ge=1, le=300)
    db_pool_recycle: int = Field(default=1800, ge=60)
    db_echo: bool = False

    # Twilio
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_phone_number: str = ""

    # AI (OpenRouter)
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_model: str = "meta-llama/llama-3.3-8b-instruct:free"
    openrouter_timeout_seconds: float = 60.0
    openrouter_max_attempts: int = Field(default=3, ge=1, le=10)

    # Uploads
    upload_dir: str = "./data/knowledge"
    max_upload_mb: int = 10

    # Usage limits (free tier: 50 minutes/month)
    free_tier_minutes: int = 50

    @field_validator("environment")
    @classmethod
    def _normalised_environment(cls, v: str) -> str:
        return v.strip().lower() or "development"

    @field_validator("database_url")
    @classmethod
    def _known_database(cls, v: str) -> str:
        url = v.strip()
        if not url:
            raise ValueError("DATABASE_URL must be set")
        if not url.startswith(("postgresql", "sqlite")):
            raise ValueError(f"DATABASE_URL must be postgresql:// or sqlite:// (got '{url.split(':', 1)[0]}')")
        return url

    @model_validator(mode="after")
    def _production_invariants(self) -> Settings:
        if not self.is_production:
            return self
        if self.jwt_secret == _DEFAULT_JWT_SECRET:
            raise ValueError("JWT_SECRET must be set to a strong random value in production.")
        if len(self.jwt_secret) < _MIN_JWT_SECRET_LENGTH:
            raise ValueError(f"JWT_SECRET must be at least {_MIN_JWT_SECRET_LENGTH} characters in production.")
        if self.debug:
            raise ValueError(f"DEBUG must be false when ENVIRONMENT={self.environment}")
        return self

    @property
    def is_production(self) -> bool:
        return self.environment in _PRODUCTION_LIKE

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.backend_cors_origins.split(",") if o.strip()]

    @property
    def max_upload_bytes(self) -> int:
        return self.max_upload_mb * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
