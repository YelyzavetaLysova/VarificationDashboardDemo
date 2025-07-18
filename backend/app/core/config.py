from pydantic import BaseSettings

class Settings(BaseSettings):
    geoip_api_key: str
    openai_api_key: str
    # ...more settings...

    class Config:
        env_file = ".env"

settings = Settings()
