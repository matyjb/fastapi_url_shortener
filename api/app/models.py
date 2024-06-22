import datetime
from sqlalchemy import Column, DateTime, Integer, String
from app.database import Base


class URL(Base):
    __tablename__ = "urls"
    id = Column(Integer, primary_key=True)
    original_url = Column(String)
    short_url_id = Column(String, unique=True)
    clicks = Column(Integer, default=0)
    expiration_date = Column(DateTime, default=datetime.datetime.now() + datetime.timedelta(days=7))
