# backend/app/services/video_metadata.py
import subprocess
from fastapi import HTTPException

async def get_video_duration(file_path: str) -> float:
    """
    Runs ffprobe to get the duration in seconds.
    """
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        file_path
    ]
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if proc.returncode != 0:
        raise HTTPException(500, f"ffprobe error: {proc.stderr.strip()}")
    try:
        return float(proc.stdout.strip())
    except ValueError:
        raise HTTPException(500, "Could not parse video duration")
