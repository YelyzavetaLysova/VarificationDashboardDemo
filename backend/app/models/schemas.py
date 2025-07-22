from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime  # use standard datetime instead of pendulum

# Request model for the /verify endpoint
class VerifyRequest(BaseModel):
    location_input: str         # IP address or location string
    timestamp_input: str        # Raw timestamp input (string)
    identity: str               # Person identifier, e.g., name or ID

# Structured contact info returned from research service
class Contact(BaseModel):
    type: str                   # e.g., "email", "phone", "linkedin"
    value: str                  # the actual value
    source_url: Optional[str]   # URL where the contact was found (optional)

# Final response model returned by the /verify endpoint
class VerifyResponse(BaseModel):
    id: str                     # Unique identifier
    geo: Dict[str, Any]         # Serialized GeoJSON object (as dict)
    timestamp: datetime         # Normalized timestamp (ISO format)
    contacts: List[Contact]     # List of found contact info

# Optional geolocation result model (if used separately)
class GeolocationResult(BaseModel):
    location: Dict[str, Any]    # Serialized GeoJSON Feature (as dict)

class UploadResponse(BaseModel):
    filename: str    # no regex → accepts any string
    size:     int
    path:     str
    provider: str
