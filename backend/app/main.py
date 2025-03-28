from fastapi import FastAPI, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
import os
import traceback
from .utils.ai_integration import generate_ai_response
from .database import Base, engine, get_db, SessionLocal
from .database import db_model as models
from .database import crud
import importlib
from sqlalchemy import text

# Create database tables
try:
    models.Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")
except Exception as e:
    print(f"❌ ERROR: Failed to create database tables: {e}")
    traceback.print_exc()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root_dir():
    print("Working FastAPI....!!")
    return {"Hello": "World"}

class InputData(BaseModel):
    input: str

@app.post("/input")
async def check_url(data: InputData):
    try:
        result = generate_ai_response(data.input)
        return {"response": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# New endpoints for threat data
@app.get("/threats/{threat_id}")
def get_threat(threat_id: int, db: Session = Depends(get_db)):
    db_threat = crud.get_threat(db, threat_id=threat_id)
    if db_threat is None:
        raise HTTPException(status_code=404, detail="Threat not found")
    return db_threat

class ThreatCreate(BaseModel):
    # Define fields matching your database model
    name: str
    description: str
    # Add other fields as needed

@app.post("/threats", status_code=201)
def create_threat(threat: ThreatCreate, db: Session = Depends(get_db)):
    return crud.create_threat(db=db, data=threat.dict())

# ThreatData model for response
class ThreatDataResponse(BaseModel):
    id: int
    name: str
    value: int
    color: str
    description: str = None  # Make it optional
    
    class Config:
        from_attributes = True  # Updated from orm_mode in Pydantic v2

# TimeSeriesData model for response
class TimeSeriesDataResponse(BaseModel):
    id: int
    time: str
    attacks: int
    mitigations: int
    
    class Config:
        from_attributes = True  # Updated from orm_mode for Pydantic v2

# Mock data endpoint handlers
@app.get("/threats", response_model=List[ThreatDataResponse])
def get_threats(db: Session = Depends(get_db)):
    # Try to get from database first
    try:
        threats = db.query(models.ThreatData).all()
        if threats:
            return threats
    except:
        pass
    
    # Fallback to mock data
    return [
        {"id": 1, "name": "Persistence", "value": 78, "color": "#FF6384"},
        {"id": 2, "name": "Privilege Escalation", "value": 65, "color": "#36A2EB"},
        {"id": 3, "name": "Defense Evasion", "value": 83, "color": "#FFCE56"},
        {"id": 4, "name": "Credential Access", "value": 47, "color": "#4BC0C0"},
        {"id": 5, "name": "Discovery", "value": 52, "color": "#9966FF"},
        {"id": 6, "name": "Lateral Movement", "value": 43, "color": "#FF9F40"}
    ]

@app.get("/time-series", response_model=List[TimeSeriesDataResponse])
def get_time_series(db: Session = Depends(get_db)):
    # You can replace this with actual database queries later
    return [
        {"id": 1, "time": "00:00", "attacks": 12, "mitigations": 10},
        {"id": 2, "time": "04:00", "attacks": 18, "mitigations": 15},
        {"id": 3, "time": "08:00", "attacks": 35, "mitigations": 30},
        {"id": 4, "time": "12:00", "attacks": 42, "mitigations": 38},
        {"id": 5, "time": "16:00", "attacks": 28, "mitigations": 24},
        {"id": 6, "time": "20:00", "attacks": 15, "mitigations": 13}
    ]

# Combine both startup events into one robust handler
@app.on_event("startup")
async def startup_db_client():
    try:
        # First verify connection
        db = SessionLocal()
        try:
            # Execute a simple query to test connection
            result = db.execute(text("SELECT 1")).fetchone()
            if result[0] == 1:
                print("✅ Database connection is working!")
            else:
                print("❌ Database connection test returned unexpected result")
        except Exception as e:
            print(f"❌ ERROR: Database connection test failed: {e}")
            traceback.print_exc()
            return
        
        # Then initialize data if needed
        try:
            # Check if data exists, if not add some sample data
            existing = db.query(models.ThreatData).first()
            if not existing:
                # Add multiple sample threats matching our frontend expectations
                sample_threats = [
                    models.ThreatData(
                        name="Persistence",
                        value=78,
                        color="#FF6384",
                        description="Techniques used by attackers to maintain access to systems"
                    ),
                    models.ThreatData(
                        name="Privilege Escalation",
                        value=65,
                        color="#36A2EB",
                        description="Techniques that enable attackers to gain higher-level permissions"
                    ),
                    models.ThreatData(
                        name="Defense Evasion",
                        value=83,
                        color="#FFCE56",
                        description="Techniques used to avoid detection"
                    ),
                    models.ThreatData(
                        name="Credential Access",
                        value=47,
                        color="#4BC0C0",
                        description="Techniques for stealing credentials like passwords"
                    ),
                    models.ThreatData(
                        name="Discovery",
                        value=52,
                        color="#9966FF",
                        description="Techniques used by attackers to gain knowledge about systems"
                    ),
                    models.ThreatData(
                        name="Lateral Movement",
                        value=43,
                        color="#FF9F40",
                        description="Techniques to move through the environment"
                    )
                ]
                
                for threat in sample_threats:
                    db.add(threat)
                
                db.commit()
                print("✅ Added sample threat data to database")
        except Exception as e:
            print(f"❌ ERROR: Failed to initialize sample data: {e}")
            traceback.print_exc()
        finally:
            db.close()
    except Exception as e:
        print(f"❌ ERROR: Could not connect to database: {e}")
        print(f"Check your database configuration. Details: {str(e)}")
        traceback.print_exc()