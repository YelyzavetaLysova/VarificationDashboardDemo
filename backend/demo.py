import asyncio

from app.core.dependencies import get_geolocation_service, get_timestamp_service, get_research_service

async def main():
    # Initialize services
    geo_service = get_geolocation_service()
    time_service = get_timestamp_service()
    research_service = get_research_service()

    # Generate random data
    geo = await geo_service.resolve("any input")
    ts = time_service.normalize("any input")
    contacts = await research_service.find_contacts("any identity")

    # Print results to console
    print("=== Demo Verification Output ===")
    print(f"Geolocation: {geo}")
    print(f"Timestamp:   {ts}")
    print(f"Contacts:    {contacts}")

if __name__ == "__main__":
    asyncio.run(main())