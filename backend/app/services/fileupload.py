# backend/app/services/fileupload.py
import os
from uuid import uuid4
from fastapi import UploadFile, HTTPException
import aiofiles

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")

class FileSystemUploadService:
    """
    Saves an incoming UploadFile to `UPLOAD_DIR`.
    Uses async writes via aiofiles, with sync fallback.
    Returns metadata dict.
    """
    def __init__(self, upload_dir: str = UPLOAD_DIR):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    async def handle(self, file: UploadFile) -> dict:
        ext = os.path.splitext(file.filename)[1]
        unique_name = f"{uuid4()}{ext}"
        dest_path = os.path.join(self.upload_dir, unique_name)

        # Async write
        try:
            async with aiofiles.open(dest_path, "wb") as out_f:
                while chunk := await file.read(1024 * 1024):
                    await out_f.write(chunk)
        except ImportError:
            # Fallback to sync
            contents = await file.read()
            with open(dest_path, "wb") as out_f:
                out_f.write(contents)
        finally:
            await file.close()

        # Verify file exists
        try:
            size = os.path.getsize(dest_path)
        except OSError as e:
            raise HTTPException(500, f"Cannot read saved file size: {e}")

        return {
            "filename": file.filename,
            "size": size,
            "path": dest_path,
            "provider": "filesystem"
        }
