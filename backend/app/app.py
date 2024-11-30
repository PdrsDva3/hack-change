"""Само приложение"""
from fastapi import FastAPI, File, UploadFile, HTTPException
from pathlib import Path
import shutil
import app.coordinates as coordinates
import base64

from fastapi import APIRouter, FastAPI, HTTPException, UploadFile

from fastapi.middleware.cors import CORSMiddleware
from db.db import get_all_dots, create_meme

app = FastAPI()

@app.post("/file/upload-bytes")
async def upload_file_bytes(file_bytes: bytes = File()):
  return {'file_bytes': str(file_bytes)}


@app.post("/file/upload-file")
async def upload_file(file: UploadFile):
    save_directory = Path("./uploaded_files")
    save_directory.mkdir(parents=True, exist_ok=True)

    file_path = save_directory / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # arr = coordinates.coord(file_path)
    # if not arr:
    #     raise HTTPException(status_code=418, detail="i am a teapot ;)")

    return {file.filename: file_path}

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