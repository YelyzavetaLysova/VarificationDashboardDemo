from fastapi import FastAPI
from app.api.verify import router as verify_router

app = FastAPI(title="Verification Dashboard API")

app.include_router(verify_router, prefix="/verify", tags=["verify"])
