# backend/app/api/videos.py

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from datetime import datetime
from bson import ObjectId

from app.core.dependencies import get_db
from app.services.fileupload import FileSystemUploadService
from app.services.video_metadata import get_video_duration
from app.services.frame_extraction import extract_frames
from app.models.schemas import VideoModel

router = APIRouter(prefix="/videos", tags=["videos"])
_upload_service = FileSystemUploadService()


@router.post("/", response_model=VideoModel)
async def upload_video(
    file: UploadFile = File(...),
    db = Depends(get_db),
):
    """
    1) Save the uploaded video to disk.
    2) Probe its duration via ffprobe.
    3) Insert a Video document into MongoDB.
    4) Extract 9 key‐frames, tag each with video_id, and push into the same document.
    5) Return the VideoModel.
    """

    # 1) Save video to disk
    meta = await _upload_service.handle(file)
    storage_path = meta["path"]

    # 2) Probe duration
    duration = await get_video_duration(storage_path)

    # 3) Build the Video document
    video_id = ObjectId()
    uploader_id = ObjectId("000000000000000000000000")  # dummy until auth

    video_doc = {
        "_id":           video_id,
        "uploaded_by":   uploader_id,
        "file_name":     meta["filename"],
        "storage_path":  storage_path,
        "mime_type":     file.content_type,
        "file_size":     meta["size"],
        "duration":      duration,
        "uploaded_at":   datetime.utcnow(),
        "frames":        []  # we'll fill this next
    }

    # 4) Insert into MongoDB
    await db["videos"].insert_one(video_doc)

    # 5) Extract exactly 9 key‐frames
    frames = await extract_frames(storage_path, 9)

    # --- NEW: tag each frame with the parent video_id ---
    for f in frames:
        f["video_id"] = video_id

    # push them into Mongo
    if frames:
        await db["videos"].update_one(
            {"_id": video_id},
            {"$push": {"frames": {"$each": frames}}}
        )
        # also reflect them in our in-memory doc so the response has them
        video_doc["frames"] = frames

    # 6) Return the new VideoModel
    return VideoModel(**video_doc)
