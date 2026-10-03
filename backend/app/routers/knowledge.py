from __future__ import annotations

import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.knowledge_doc import KnowledgeDoc
from app.models.user import User
from app.schemas.knowledge import KnowledgeDocOut

router = APIRouter(prefix="/knowledge", tags=["knowledge"])


@router.get("", response_model=list[KnowledgeDocOut])
def list_docs(
    agent_id: int | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[KnowledgeDocOut]:
    query = select(KnowledgeDoc).where(KnowledgeDoc.business_id == current_user.business_id)
    if agent_id is not None:
        query = query.where(KnowledgeDoc.agent_id == agent_id)
    docs = db.scalars(query.order_by(KnowledgeDoc.created_at.desc())).all()
    return [KnowledgeDocOut.model_validate(d) for d in docs]


@router.post("", response_model=KnowledgeDocOut, status_code=status.HTTP_201_CREATED)
async def upload_doc(
    file: UploadFile,
    agent_id: int | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> KnowledgeDocOut:
    if not file.filename:
        raise HTTPException(status_code=422, detail="No file provided")

    content = await file.read()
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(status_code=413, detail=f"File too large. Max {settings.max_upload_mb}MB.")

    upload_dir = os.path.join(settings.upload_dir, str(current_user.business_id))
    os.makedirs(upload_dir, exist_ok=True)
    file_id = uuid.uuid4().hex
    ext = os.path.splitext(file.filename)[1]
    file_path = os.path.join(upload_dir, f"{file_id}{ext}")

    with open(file_path, "wb") as f:
        f.write(content)

    content_text = None
    if file.content_type and file.content_type.startswith("text/"):
        try:
            content_text = content.decode("utf-8")
        except UnicodeDecodeError:
            pass

    doc = KnowledgeDoc(
        business_id=current_user.business_id,
        agent_id=agent_id,
        title=file.filename,
        filename=file.filename,
        content_text=content_text,
        file_path=file_path,
        file_size=len(content),
        mime_type=file.content_type or "application/octet-stream",
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return KnowledgeDocOut.model_validate(doc)


@router.delete("/{doc_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_doc(
    doc_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    doc = db.get(KnowledgeDoc, doc_id)
    if doc is None or doc.business_id != current_user.business_id:
        raise HTTPException(status_code=404, detail="Document not found")
    if os.path.exists(doc.file_path):
        os.remove(doc.file_path)
    db.delete(doc)
    db.commit()
