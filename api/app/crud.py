import random
import string
from sqlalchemy.orm import Session
from . import models


def generate_short_url(length: int = 6):
    characters = string.ascii_letters + string.digits
    return "".join(random.choice(characters) for _ in range(length))


def shorten_url(db: Session, original_url: str):
    short_url_id = generate_short_url()
    while (
        db.query(models.URL).filter(models.URL.short_url_id == short_url_id).first()
        != None
    ):
        # try again
        short_url_id = generate_short_url()

    db_url = models.URL(original_url=original_url, short_url_id=short_url_id)

    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url


def get_url(db: Session, short_url_id: str):
    return db.query(models.URL).filter(models.URL.short_url_id == short_url_id).first()
