import re
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
        
urlRe = re.compile(r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)")


@app.post("/create", response_model=schemas.URL)
async def shorten_url(body: schemas.URLCreate, db: Session = Depends(get_db)):
    # add https:// if original_url lacks https:// or http://
    # check if original_url is a valid url
    # if it is not a valid url, raise an exception
    
    if not body.original_url.startswith("https://") and not body.original_url.startswith("http://"):
        body.original_url = "https://" + body.original_url
        
    if urlRe.match(body.original_url) == None:
        raise HTTPException(400, "Invalid url")
    try:
        db_url = crud.shorten_url(db, body.original_url)
    except Exception as e:
        raise HTTPException(500, str(e))
    return db_url


@app.get("/{id}", response_model=schemas.URL)
async def get_url(id: str, db: Session = Depends(get_db)):
    db_url = crud.get_url(db, id)
    if db_url is None:
        raise HTTPException(404, "Url not found")
    return db_url
