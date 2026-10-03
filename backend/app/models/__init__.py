"""Register every model on Base.metadata so Alembic and create_all see them."""
from app.models.user import User  # noqa: F401
from app.models.business import Business  # noqa: F401
from app.models.voice_agent import VoiceAgent  # noqa: F401
from app.models.call import Call  # noqa: F401
from app.models.call_transcript import CallTranscript  # noqa: F401
from app.models.knowledge_doc import KnowledgeDoc  # noqa: F401
from app.models.campaign import Campaign, CampaignContact  # noqa: F401
from app.models.usage_tracking import UsageTracking  # noqa: F401
