"""само приложение"""
import base64

from fastapi import APIRouter, FastAPI, HTTPException, UploadFile

from fastapi.middleware.cors import CORSMiddleware
from db.db import get_all_dots, create_meme


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:3000",
    "https://localhost:8000",
    "https://localhost:5173",
    "https://localhost:5174",
    "https://localhost:4173",
    "http://garbagegogoriki.ru",
    "http://garbagegogoriki.ru/api",
    "http://garbagegogoriki.ru/",
    "https://garbagegogoriki.ru",
    "https://garbagegogoriki.ru/api",
    "https://garbagegogoriki.ru/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dots_router = APIRouter()

@dots_router.get("/all")
async def get_all_dots_h():
    all_points = await get_all_dots()
    if not all_points:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return all_points

app.include_router(dots_router, prefix="/dot", tags=["dot"])


@app.post("/meme/create")
async def create_meme_h(file: UploadFile):
    meme = base64.b64encode(file.file.read())
    await create_meme(file.filename, meme)
    return "üraaaa goool"