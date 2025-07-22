from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from app.core.dependencies import get_upload_service
from app.services.fileupload import FileSystemUploadService, DefaultUploadService, EchoUploadService

router = APIRouter(
    prefix="/upload",
    tags=["upload"]
)

@router.post("/", summary="Upload a file")
async def upload_file(
    file: UploadFile = File(...),
    # FastAPI will call get_upload_service() for you
    upload_svc = Depends(get_upload_service),
):
    try:
        result = await upload_svc.handle(file)
        return {"status": "ok", **result}
    except ValueError as e:
        # e.g. unknown provider
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")
