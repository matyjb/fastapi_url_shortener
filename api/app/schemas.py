from datetime import datetime
from pydantic import BaseModel


class URLBase(BaseModel):
    original_url: str


class URLCreate(URLBase):
    pass


class URL(URLBase):
    id: int
    short_url_id: str
    clicks: int
    expiration_date: datetime

    class Config:
        from_attributes = True
