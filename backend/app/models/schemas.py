# backend/app/models/schemas.py

from datetime import datetime
from typing import Any, Dict, List, Optional

from bson import ObjectId as _ObjectId
from pydantic import BaseModel, Field
from pydantic_core import core_schema

# ─── Custom ObjectId type for Pydantic v2 ────────────────────────────────────
class PyObjectId(_ObjectId):
    """
    A wrapper around bson.ObjectId that tells Pydantic how
    to validate and serialize itself under v2’s new core-schema system.
    """
    @classmethod
    def __get_pydantic_core_schema__(cls, source: Any, handler: Any) -> core_schema.CoreSchema:
        return core_schema.no_info_plain_validator_function(
            cls._validate,
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def _validate(cls, v: Any, **kwargs: Any) -> _ObjectId:
        # Accept either an actual ObjectId or a 24-hex str
        if isinstance(v, _ObjectId):
            return v
        if isinstance(v, str) and _ObjectId.is_valid(v):
            return _ObjectId(v)
        raise TypeError(f"Invalid ObjectId: {v!r}")


# ─── API request/response models ─────────────────────────────────────────────

class VerifyRequest(BaseModel):
    location_input: str
    timestamp_input: str
    identity: str

class Contact(BaseModel):
    type: str
    value: str
    source_url: Optional[str] = None

class VerifyResponse(BaseModel):
    id: str
    geo: Dict[str, Any]
    timestamp: datetime
    contacts: List[Contact]

class GeolocationResult(BaseModel):
    location: Dict[str, Any]

class UploadResponse(BaseModel):
    filename: str
    size: int
    path: str
    provider: str


# ─── Domain models ───────────────────────────────────────────────────────────

class FrameModel(BaseModel):
    id: PyObjectId = Field(..., alias="_id")
    video_id: PyObjectId
    index: int
    timestamp: float
    image_url: str
    extracted_at: datetime

    model_config = {
        "populate_by_name": True,
        "json_encoders": {
            _ObjectId: str,
            datetime: lambda dt: dt.isoformat(),
        },
    }

class VideoModel(BaseModel):
    id: PyObjectId = Field(..., alias="_id")
    uploaded_by: PyObjectId
    file_name: str
    storage_path: str
    mime_type: str
    file_size: int
    duration: float
    uploaded_at: datetime
    frames: List[FrameModel] = []

    model_config = {
        "populate_by_name": True,
        "json_encoders": {
            _ObjectId: str,
            datetime: lambda dt: dt.isoformat(),
        },
    }

class AnalysisModel(BaseModel):
    id: PyObjectId = Field(..., alias="_id")
    frame_id: PyObjectId
    video_id: PyObjectId
    user_id: PyObjectId
    credibility_score: float
    annotations: Optional[List[Dict[str, Any]]] = None
    notes: Optional[str] = None
    analyzed_at: datetime

    model_config = {
        "populate_by_name": True,
        "json_encoders": {
            _ObjectId: str,
            datetime: lambda dt: dt.isoformat(),
        },
    }

class UserConfig(BaseModel):
    frameExtractionCount: int = 9
    defaultAnalysisModel: str = "v1.0"
    notifications: Dict[str, bool] = {
        "onNewAnalysis": True,
        "dailySummary": False,
    }

class UserModel(BaseModel):
    id: PyObjectId = Field(..., alias="_id")
    email: str
    name: str
    created_at: datetime
    config: UserConfig

    model_config = {
        "populate_by_name": True,
        "json_encoders": {
            _ObjectId: str,
            datetime: lambda dt: dt.isoformat(),
        },
    }
