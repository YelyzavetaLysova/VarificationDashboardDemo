from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import VerifyRequest, VerifyResponse
from app.core.dependencies import get_geolocation_service, get_timestamp_service, get_research_service
from app.services.geolocation import GeolocationService
from app.services.timestamp import TimestampService
from app.services.research import ResearchService

router = APIRouter()

@router.post("/", response_model=VerifyResponse)
async def verify(
    payload: VerifyRequest,
    geo_service: GeolocationService = Depends(get_geolocation_service),
    time_service: TimestampService = Depends(get_timestamp_service),
    research_service: ResearchService = Depends(get_research_service),
):
    # 1. Geolocation
    location = await geo_service.resolve(payload.location_input)

    # 2. Timestamp normalization
    timestamp = time_service.normalize(payload.timestamp_input)

    # 3. Web research
    contact_info = await research_service.find_contacts(payload.identity)

    return VerifyResponse(
        id="TODO_GENERATE_ID",
        geo=location,
        timestamp=timestamp,
        contacts=contact_info,
    )
