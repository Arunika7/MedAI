from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import asyncio

router = APIRouter()

async def mock_ai_stream(prompt: str):
    response = f"I received your prompt: '{prompt}'. This is a streamed response from the MedAI backend! We are currently using a mock AI. Later, this will be connected to Gemini/OpenAI/LangChain."
    words = response.split(' ')
    for word in words:
        yield f"data: {word} \n\n"
        await asyncio.sleep(0.1)
    yield "data: [DONE]\n\n"

@router.post("/stream")
async def chat_stream(request: dict):
    prompt = request.get("prompt", "")
    return StreamingResponse(mock_ai_stream(prompt), media_type="text/event-stream")
