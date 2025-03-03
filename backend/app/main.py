from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

@app.post("/input")
async def check_url(input: str):
    try:
        result = generate_ai_response(input)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))