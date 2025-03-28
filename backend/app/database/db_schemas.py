from pydantic import BaseModel
from typing import List, Optional

class ThreatDataBase(BaseModel):
    name: str
    value: int
    color: str

class ThreatDataCreate(ThreatDataBase):
    pass

class ThreatData(ThreatDataBase):
    id: int

    class Config:
        orm_mode = True

class TimeSeriesDataBase(BaseModel):
    time: str
    attacks: int
    mitigations: int

class TimeSeriesDataCreate(TimeSeriesDataBase):
    pass

class TimeSeriesData(TimeSeriesDataBase):
    id: int

    class Config:
        orm_mode = True

class NewsItemBase(BaseModel):
    title: str
    source: str
    date: str
    url: str

class NewsItemCreate(NewsItemBase):
    pass

class NewsItem(NewsItemBase):
    id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    email: str
    role: str
    avatar: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class TerminalCommandBase(BaseModel):
    command: str
    description: str

class TerminalCommandCreate(TerminalCommandBase):
    pass

class TerminalCommand(TerminalCommandBase):
    id: int

    class Config:
        orm_mode = True