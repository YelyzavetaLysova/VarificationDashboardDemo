from app.services.geolocation import RandomGeolocationService, GeolocationService
from app.services.timestamp import RandomTimestampService, TimestampService
from app.services.research import RandomResearchService, ResearchService


def get_geolocation_service() -> GeolocationService:
    return RandomGeolocationService()


def get_timestamp_service() -> TimestampService:
    return RandomTimestampService()


def get_research_service() -> ResearchService:
    return RandomResearchService()