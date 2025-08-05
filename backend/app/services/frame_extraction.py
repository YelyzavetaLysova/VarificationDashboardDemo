# backend/app/services/frame_extraction.py

import os
from pathlib import Path
from datetime import datetime
from bson import ObjectId

# Make sure the FRAME_DIR exists (and create parents if needed)
FRAME_DIR = Path(os.getenv("FRAME_DIR", "frames"))
FRAME_DIR.mkdir(parents=True, exist_ok=True)

async def extract_frames(video_path: str, count: int) -> list[dict]:
    """
    Try MoviePy first; if missing, fall back to OpenCV.
    Returns a list of dicts ready to $push into MongoDB.
    Each dict has:
      - _id: ObjectId
      - index: int
      - timestamp: float
      - image_url: str  (served under /frames/<filename>)
      - extracted_at: datetime
    """
    # 1) Try MoviePy
    try:
        from moviepy.editor import VideoFileClip
    except ImportError:
        VideoFileClip = None

    if VideoFileClip:
        clip = VideoFileClip(video_path)
        duration = clip.duration or 0
        timestamps = [i * duration / count for i in range(count)]
        frames = _extract_with_moviepy(clip, timestamps)
        # cleanup MoviePy resources
        clip.reader.close()
        if clip.audio:
            clip.audio.reader.close_proc()
        return frames

    # 2) Fallback to OpenCV
    try:
        import cv2
    except ImportError:
        raise RuntimeError("Neither moviepy nor OpenCV is installed")

    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 1
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    duration = (total_frames / fps) if fps > 0 else 0
    timestamps = [i * duration / count for i in range(count)]
    frames = _extract_with_opencv(cap, timestamps)
    return frames


def _extract_with_moviepy(clip, timestamps: list[float]) -> list[dict]:
    out: list[dict] = []
    for idx, t in enumerate(timestamps):
        frame_id = ObjectId()
        filename = f"{frame_id}.png"
        dest = FRAME_DIR / filename
        clip.save_frame(str(dest), t)
        out.append({
            "_id": frame_id,
            "index": idx,
            "timestamp": t,
            "image_url": f"/frames/{filename}",
            "extracted_at": datetime.utcnow(),
        })
    return out


def _extract_with_opencv(cap, timestamps: list[float]) -> list[dict]:
    import cv2 as _cv2
    out: list[dict] = []
    for idx, t in enumerate(timestamps):
        cap.set(_cv2.CAP_PROP_POS_MSEC, t * 1000)
        ret, frame = cap.read()
        if not ret:
            continue
        frame_id = ObjectId()
        filename = f"{frame_id}.png"
        dest = FRAME_DIR / filename
        _cv2.imwrite(str(dest), frame)
        out.append({
            "_id": frame_id,
            "index": idx,
            "timestamp": t,
            "image_url": f"/frames/{filename}",
            "extracted_at": datetime.utcnow(),
        })
    cap.release()
    return out
