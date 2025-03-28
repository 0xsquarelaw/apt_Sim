from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Base

class ThreatData(Base):
    __tablename__ = "threat_data"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    value = Column(Integer, default=0)
    color = Column(String, default="#FF6384")
    description = Column(String, nullable=True)

class TimeSeriesData(Base):
    __tablename__ = "time_series_data"

    id = Column(Integer, primary_key=True, index=True)
    time = Column(String)
    attacks = Column(Integer)
    mitigations = Column(Integer)

class NewsItem(Base):
    __tablename__ = "news_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    source = Column(String)
    date = Column(String)
    url = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    role = Column(String)
    avatar = Column(String)

class TerminalCommand(Base):
    __tablename__ = "terminal_commands"

    id = Column(Integer, primary_key=True, index=True)
    command = Column(String)
    description = Column(String)