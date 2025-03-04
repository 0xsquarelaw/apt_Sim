from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.ai_integration import generate_ai_response

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
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))