from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.core.dependencies import get_upload_service

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    provider: str = Form("default")
):
    try:
        service = get_upload_service(provider)
        return await service.handle(file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
