from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app import models
from app import schemas
from app.database import SessionLocal, engine
from app import crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/create", response_model=schemas.URL)
async def shorten_url(original_url: schemas.URLCreate, db: Session = Depends(get_db)):
    db_url = crud.shorten_url(db, original_url.original_url)
    return db_url


@app.get("/{id}", response_model=schemas.URL)
async def get_url(id: str, db: Session = Depends(get_db)):
    db_url = crud.get_url(db, id)
    if db_url is None:
        raise HTTPException(404, "Url not found")
    return db_url
