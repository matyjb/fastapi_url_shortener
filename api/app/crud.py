import datetime
import random
import string
from sqlalchemy.orm import Session
from . import models


def generate_short_url_id(length: int = 6):
    characters = string.ascii_letters + string.digits
    return "".join(random.choice(characters) for _ in range(length))


def shorten_url(db: Session, original_url: str):
    triesLimit = 10
    existsButExpired = False
    now = datetime.datetime.now()

    while triesLimit > 0:
        short_url_id = generate_short_url_id()
        url = (
            db.query(models.URL).filter(models.URL.short_url_id == short_url_id).first()
        )
        # print(url.expiration_date < now)
        if url == None:
            # free id found
            break
        elif url.expiration_date < now:
            # obj expired and can be rewritten
            existsButExpired = True
            break
        else:
            # try again finding free short url id
            triesLimit -= 1

    if triesLimit == 0:
        raise Exception("Could not generate short url id")
    
    if existsButExpired:
        db.delete(url)
        db.commit()
    
    # create new url
    db_new_url = models.URL(original_url=original_url, short_url_id=short_url_id)
    db.add(db_new_url)
    db.commit()
    db.refresh(db_new_url)
    return db_new_url


def get_url(db: Session, short_url_id: str):
    now = datetime.datetime.now()
    return (
        db.query(models.URL)
        .filter(
            models.URL.short_url_id == short_url_id
            and models.URL.expiration_date > now,
        )
        .first()
    )
