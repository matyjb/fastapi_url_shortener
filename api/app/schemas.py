from pydantic import BaseModel


class URLBase(BaseModel):
    original_url: str


class URLCreate(URLBase):
    pass


class URL(URLBase):
    id: int
    short_url: str

    class Config:
        from_attributes = True
