from sqlalchemy import Column, Integer, String
from app.database import Base


class URL(Base):
    __tablename__ = "urls"
    id = Column(Integer, primary_key=True)
    original_url = Column(String)
    short_url = Column(String, unique=True)
