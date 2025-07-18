from pydantic import BaseModel
from typing import List, Optional
from geojson import Feature
from pendulum import DateTime

class VerifyRequest(BaseModel):
    location_input: str  # IP or address
    timestamp_input: str
    identity: str       # e.g. name or identifier

class Contact(BaseModel):
    type: str           # e.g. "email", "phone", "linkedin"
    value: str
    source_url: Optional[str]

class VerifyResponse(BaseModel):
    id: str
    geo: Feature        # GeoJSON Feature (Point or Polygon)
    timestamp: DateTime
    contacts: List[Contact]
    model_config = {
        "arbitrary_types_allowed": True
    }
