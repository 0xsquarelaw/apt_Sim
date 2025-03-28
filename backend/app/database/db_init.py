from sqlalchemy.orm import Session
from . import engine, Base, database
from .db_model import ThreatData  # Import your models directly
from . import models

def seed_database(db: Session):
    # Check if data already exists
    if db.query(models.ThreatData).first():
        print("Database already has data, skipping seed")
        return
    
    # Seed threat data
    threat_data = [
        {"name": "Persistence", "value": 78, "color": "#FF6384"},
        {"name": "Privilege Escalation", "value": 65, "color": "#36A2EB"},
        {"name": "Defense Evasion", "value": 83, "color": "#FFCE56"},
        {"name": "Credential Access", "value": 47, "color": "#4BC0C0"},
        {"name": "Discovery", "value": 52, "color": "#9966FF"},
        {"name": "Lateral Movement", "value": 43, "color": "#FF9F40"}
    ]
    
    for data in threat_data:
        db.add(models.ThreatData(**data))
    
    # Seed time series data
    time_series_data = [
        {"time": "00:00", "attacks": 12, "mitigations": 10},
        {"time": "04:00", "attacks": 18, "mitigations": 15},
        {"time": "08:00", "attacks": 35, "mitigations": 30},
        {"time": "12:00", "attacks": 42, "mitigations": 38},
        {"time": "16:00", "attacks": 28, "mitigations": 24},
        {"time": "20:00", "attacks": 15, "mitigations": 13}
    ]
    
    for data in time_series_data:
        db.add(models.TimeSeriesData(**data))
    
    # Seed news items
    news_items = [
        {
            "title": "New Ransomware Variant Targets Healthcare Sector",
            "source": "CyberSecurity News",
            "date": "2025-04-15",
            "url": "#"
        },
        {
            "title": "Critical Vulnerability Found in Popular VPN Service",
            "source": "Threat Post",
            "date": "2025-04-14",
            "url": "#"
        },
        {
            "title": "APT Group Targets Financial Institutions with New Malware",
            "source": "Dark Reading",
            "date": "2025-04-13",
            "url": "#"
        },
        {
            "title": "Zero-Day Exploit Discovered in Widely Used Email Client",
            "source": "Krebs on Security",
            "date": "2025-04-12",
            "url": "#"
        },
        {
            "title": "CISA Releases Advisory on Supply Chain Attacks",
            "source": "CISA",
            "date": "2025-04-11",
            "url": "#"
        }
    ]
    
    for item in news_items:
        db.add(models.NewsItem(**item))
    
    # Seed user data
    user = {
        "name": "Alex Morgan",
        "email": "alex.morgan@securityops.com",
        "role": "Security Analyst",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
    
    db.add(models.User(**user))
    
    # Seed terminal commands
    terminal_commands = [
        {"command": "scan --network", "description": "Scan network for vulnerabilities"},
        {"command": "analyze --logs", "description": "Analyze system logs for suspicious activity"},
        {"command": "simulate --attack persistence", "description": "Simulate persistence attack vector"},
        {"command": "report --generate", "description": "Generate security report"},
        {"command": "mitigate --threat", "description": "Apply mitigation strategies"}
    ]
    
    for cmd in terminal_commands:
        db.add(models.TerminalCommand(**cmd))
    
    db.commit()
    print("Database seeded successfully")

def init_db():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    # Here you can add seed data if needed
    db = database.SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    
    print("Database initialized successfully")

if __name__ == "__main__":
    print("Creating tables...")
    init_db()