# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.verify import router as verify_router

app = FastAPI(
    title="Analytic Vision Dashboard API",
    description="API backend for uploading media, picking keyframes, and verifying identity.",
    version="0.1.0",
)

# ─── CORS ───────────────────────────────────────────────────────────────────────
# In development you can allow all origins; in production lock this down to your frontend's domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── AUTH ROUTES ────────────────────────────────────────────────────────────────
# /auth/signup  → create account
# /auth/login   → authenticate
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# ─── UPLOAD ROUTES ──────────────────────────────────────────────────────────────
# /upload/      → multipart file upload
app.include_router(upload_router, prefix="/upload", tags=["upload"])

# ─── VERIFY ROUTES ──────────────────────────────────────────────────────────────
# /verify/      → geolocation, timestamp, research
app.include_router(verify_router, prefix="/verify", tags=["verify"])
