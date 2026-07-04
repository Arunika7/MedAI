from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MedAI API",
    description="Backend API for the MedAI Medical Assistant",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.chat.routes import router as chat_router

@app.get("/")
def read_root():
    return {"message": "Welcome to the MedAI API"}

app.include_router(chat_router, prefix="/api/chat", tags=["chat"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
