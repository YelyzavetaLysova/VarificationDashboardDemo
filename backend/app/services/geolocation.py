import random
from geojson import Feature, Point

# geolocation service stub
class GeolocationService:
    async def resolve(self, input_str: str):
        raise NotImplementedError

class GeoIPService(GeolocationService):
    def __init__(self, api_key: str):
        self.api_key = api_key

class RandomGeolocationSevice(GeolocationService):
    async def resolve(self, input_str: str) -> Feature:
        """
        Returns a GeoJSON Point with random coordinates.
        """
        lon = random.uniform(-180, 180)
        lat = random.uniform(-90, 90)
        return Feature(geometry=Point((lon, lat)), properties={"source": "random"})