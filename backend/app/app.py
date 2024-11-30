"""Само приложение"""
import os
import random
import time

from cloudinit.netinfo import route_info
from fastapi import FastAPI, File, UploadFile, HTTPException
from pathlib import Path
import shutil

from fastapi.middleware.cors import CORSMiddleware

import app.coordinates as coordinates
import base64

from fastapi import APIRouter, FastAPI, HTTPException, UploadFile

from fastapi.middleware.cors import CORSMiddleware
from db.db import get_all_dots, create_meme, get_all_memes, get_all_routes, add_route
from db.db import get_all_dots, create_meme, add_order
from typing import Dict, Any

from fastapi import FastAPI, File, UploadFile, HTTPException
from pathlib import Path
import shutil

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import app.coordinates as coordinates
import app.route_optimizer as ta

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

# можно загружать файл как набор байтов
# @app.post("/file/upload-bytes")
# async def upload_file_bytes(file_bytes: bytes = File()):
#     return {'file_bytes': str(file_bytes)}

line_router = APIRouter()
@line_router.post("/add_line")
async def add_line(file: UploadFile):
    save_directory = Path("./uploaded_files")
    save_directory.mkdir(parents=True, exist_ok=True)

    file_path = save_directory / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    arr = coordinates.coord(file_path)
    if not arr:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")

    await add_route(file.filename, arr)

    os.remove(file_path)

    return "line was added"

@line_router.get("/all")
async def get_all_lines():
    all_lines = await get_all_routes()
    if not all_lines:
        raise HTTPException(status_code=418, detail="you have no lines")

    return all_lines

app.include_router(line_router, prefix="/line", tags=["line"])

dots_router = APIRouter()


@dots_router.get("/all")
async def get_all_dots_h():
    all_points = await get_all_dots()
    if not all_points:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return all_points


app.include_router(dots_router, prefix="/dot", tags=["dot"])

meme_router = APIRouter()

@meme_router.post("/create")
async def create_meme_h(file: UploadFile):
    meme = await file.read()
    meme = base64.b64encode(meme).decode("utf-8")
    await create_meme(file.filename, meme)
    return "meme was created =)"


@meme_router.get("/random")
async def get_memes_h():
    all_memes = await get_all_memes()
    if not all_memes:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")

    random_meme = random.choice(all_memes)
    return random_meme


app.include_router(meme_router, prefix="/meme", tags=["meme"])

tax_routers = APIRouter()
@tax_routers.post("/see")
async def see():
    demand = ta.get_demand()
    ta.assign_routes(demand)  # Планируем маршруты
    for taxi in ta.taxis:
        ta.follow_route(taxi)  # Выполняем маршруты
    # add_new_passageres()
    time.sleep(3)  # Повторяем каждые 10 секунд
    out = ta.data(1, 3)
    pp = {
        "tax": out[0],
        "time_1": out[1],
        "time_2": out[2],
        "price": out[3],
        "cap_1": out[4],
        "cap_2": out[5]
    }
    return pp


@tax_routers.post("/give")
async def see():
    await add_order(1, 3)
    demand = ta.get_demand()
    ta.assign_routes()  # Планируем маршруты
    for taxi in ta.taxis:
        ta.follow_route(taxi)  # Выполняем маршруты
    # add_new_passageres()
    out = ta.data(1, 3)
    pp = {
        "tax": out[0],
        "time_1": out[1],
        "time_2": out[2],
        "price": out[3],
        "cap_1": out[4],
        "cap_2": out[5]
    }
    return pp

app.include_router(tax_routers, prefix="/tax", tags=["tax"])