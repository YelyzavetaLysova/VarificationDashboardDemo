from fastapi import UploadFile

class DefaultUploadService:
    async def handle(self, file: UploadFile) -> dict:
        content = await file.read()
        return {
            "filename": file.filename,
            "size": len(content),
            "provider": "default"
        }

class EchoUploadService:
    async def handle(self, file: UploadFile) -> dict:
        return {
            "filename": file.filename,
            "message": "Echo handler - no processing"
        }
