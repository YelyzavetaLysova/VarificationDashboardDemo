import os
from fastapi import UploadFile
# Uncomment if you install aiofiles
# import aiofiles

class DefaultUploadService:
    async def handle(self, file: UploadFile) -> dict:
        content = await file.read()
        await file.close()
        return {
            "filename": file.filename,
            "size": len(content),
            "provider": "default"
        }

class EchoUploadService:
    async def handle(self, file: UploadFile) -> dict:
        await file.close()
        return {
            "filename": file.filename,
            "message": "Echo handler - no processing"
        }

class FileSystemUploadService:
    def __init__(self, upload_dir: str = "uploads"):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    async def handle(self, file: UploadFile) -> dict:
        """
        Save the incoming UploadFile to disk under upload_dir.
        By default this does a blocking write—if you have aiofiles installed,
        you can switch to the aiofiles version below (commented out).
        """
        dest_path = os.path.join(self.upload_dir, file.filename)

        # ===== Blocking version (no extra dependencies) =====
        contents = await file.read()
        with open(dest_path, "wb") as out_f:
            out_f.write(contents)

        await file.close()

        return {
            "filename": file.filename,
            "size": os.path.getsize(dest_path),
            "path": dest_path,
            "provider": "filesystem"
        }

        # ===== Async version (requires `pip install aiofiles`) =====
        # async with aiofiles.open(dest_path, "wb") as out_f:
        #     while chunk := await file.read(1024 * 1024):
        #         await out_f.write(chunk)
        # await file.close()
        # return {
        #     "filename": file.filename,
        #     "size": os.path.getsize(dest_path),
        #     "path": dest_path,
        #     "provider": "filesystem"
        # }
