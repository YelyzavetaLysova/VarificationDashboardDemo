# backend/app/api/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.core.dependencies import get_user_service
from app.services.auth import UserService

router = APIRouter()


# Request/response schemas
class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    name: str
    email: EmailStr


# Signup endpoint
@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
async def signup(
    payload: SignupRequest,
    user_svc: UserService = Depends(get_user_service),
):
    try:
        user = await user_svc.register(payload.name, payload.email, payload.password)
        return user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not register user: {e}",
        )


# Login endpoint
@router.post(
    "/login",
    response_model=UserResponse,
    summary="Authenticate a user",
)
async def login(
    payload: LoginRequest,
    user_svc: UserService = Depends(get_user_service),
):
    user = await user_svc.authenticate(payload.email, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return user
