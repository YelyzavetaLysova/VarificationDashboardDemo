# backend/app/core/dependencies.py

import os
from typing import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic_settings import BaseSettings
from motor.motor_asyncio import AsyncIOMotorClient

from starlette.requests import Request

from app.services.geolocation import RandomGeolocationService, GeolocationService
from app.services.timestamp import RandomTimestampService, TimestampService
from app.services.research import RandomResearchService, ResearchService
from app.services.fileupload import FileSystemUploadService
from app.services.auth import UserService
from app.models.schemas import UserModel
from app.services.video_metadata import get_video_duration
from app.services.frame_extraction import extract_frames


# ─── Settings via pydantic-settings ──────────────────────────────────────────

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "verification_dashboard"
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    FRAME_DIR: str  = os.getenv("FRAME_DIR", "frames")

    class Config:
        env_file = ".env"

settings = Settings()


# ─── MongoDB Dependency ──────────────────────────────────────────────────────

_motor_client: AsyncIOMotorClient | None = None

def get_motor_client() -> AsyncIOMotorClient:
    global _motor_client
    if _motor_client is None:
        _motor_client = AsyncIOMotorClient(settings.MONGODB_URL)
    return _motor_client

def get_db():
    return get_motor_client()[settings.DATABASE_NAME]


# ─── Auth Dependency ─────────────────────────────────────────────────────────

_security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_security),
    user_service: UserService = Depends(lambda: UserService())
) -> UserModel:
    """
    Extracts the Bearer token, looks up the user, or raises 401.
    Returns a UserModel.
    """
    token = credentials.credentials
    user_data = await user_service.get_by_token(token)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return UserModel(**user_data)


# ─── Service Factories ───────────────────────────────────────────────────────

def get_geolocation_service() -> GeolocationService:
    return RandomGeolocationService()

def get_timestamp_service() -> TimestampService:
    return RandomTimestampService()

def get_research_service() -> ResearchService:
    return RandomResearchService()

def get_upload_service(
    provider: str = Depends(lambda request: request.query_params.get("provider", "filesystem"))
) -> FileSystemUploadService:
    if provider == "filesystem":
        return FileSystemUploadService(upload_dir=settings.UPLOAD_DIR)
    raise HTTPException(400, f"Unknown upload provider: {provider}")

def get_user_service() -> UserService:
    return UserService()


# ─── Utilities ───────────────────────────────────────────────────────────────

def get_video_duration_util() -> Callable[[str], float]:
    return get_video_duration

def get_frame_extractor() -> Callable[[str, int], list]:
    return extract_frames
