from app.services.geolocation import RandomGeolocationService, GeolocationService
from app.services.timestamp import RandomTimestampService, TimestampService
from app.services.research import RandomResearchService, ResearchService
from app.services.fileupload import DefaultUploadService, EchoUploadService


def get_geolocation_service() -> GeolocationService:
    return RandomGeolocationService()


def get_timestamp_service() -> TimestampService:
    return RandomTimestampService()


def get_research_service() -> ResearchService:
    return RandomResearchService()


def get_upload_service(provider: str = "default"):
    if provider == "default":
        return DefaultUploadService()
    elif provider == "echo":
        return EchoUploadService()
    else:
        raise ValueError(f"Unknown provider: {provider}")
