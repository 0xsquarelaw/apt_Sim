from sqlalchemy.orm import Session
from . import db_model as models
from typing import List, Optional

# Get all threat data
def get_all_threats(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ThreatData).offset(skip).limit(limit).all()

# Get threat by ID
def get_threat(db: Session, threat_id: int):
    return db.query(models.ThreatData).filter(models.ThreatData.id == threat_id).first()

# Create new threat data
def create_threat(db: Session, data: dict):
    db_item = models.ThreatData(**data)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# Update existing threat data
def update_threat(db: Session, threat_id: int, data: dict):
    db_item = db.query(models.ThreatData).filter(models.ThreatData.id == threat_id).first()
    if db_item:
        for key, value in data.items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item