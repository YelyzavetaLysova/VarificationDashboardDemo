# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.dependencies import settings
from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.verify import router as verify_router
from app.api.videos import router as videos_router
from fastapi.staticfiles import StaticFiles



app = FastAPI(
    title="Analytic Vision Dashboard API",
    description="API backend for uploading media, picking keyframes, and verifying identity.",
    version="0.1.0",
)

app.mount("/frames", StaticFiles(directory="frames"), name="frames")

# ─── CORS ───────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── AUTH ROUTES ────────────────────────────────────────────────────────────────
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# ─── UPLOAD ROUTES ──────────────────────────────────────────────────────────────
app.include_router(upload_router, prefix="/upload", tags=["upload"])

# ─── VERIFY ROUTES ──────────────────────────────────────────────────────────────
app.include_router(verify_router, prefix="/verify", tags=["verify"])

# ─── VIDEO ROUTES ───────────────────────────────────────────────────────────────
app.include_router(videos_router, prefix="/videos", tags=["videos"])

# ─── STATIC FILES ───────────────────────────────────────────────────────────────

# Serve uploaded video files
app.mount(
    "/uploads",
    StaticFiles(directory=settings.UPLOAD_DIR),
    name="uploads",
)

# Serve extracted key-frame images
app.mount(
    "/frames",
    StaticFiles(directory=settings.FRAME_DIR),
    name="frames",
)
