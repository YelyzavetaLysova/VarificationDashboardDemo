from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.verify import router as verify_router



app = FastAPI(title="Verification Dashboard API")


# Add this BEFORE including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for more safety
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verify_router, prefix="/verify", tags=["verify"])
