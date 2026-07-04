from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import os
import asyncio
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

router = APIRouter()

SYSTEM_PROMPT = """You are MedAI, an advanced, highly professional, and trustworthy AI Medical Assistant. 
Your goal is to help users understand their health, analyze symptoms, and provide clear, empathetic, and scientifically accurate information.
Always include a disclaimer that you are an AI and they should consult a real doctor for medical advice.
Format your responses using Markdown for readability.
"""

async def generate_ai_stream(prompt: str):
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key or api_key == "your_api_key_here":
        # Fallback dummy stream if no key provided
        response = "I see you haven't provided a `GEMINI_API_KEY` in the `backend/.env` file yet! Please add your free key from Google AI Studio so I can give you real medical insights."
        words = response.split(' ')
        for word in words:
            yield f"data: {word} \n\n"
            await asyncio.sleep(0.05)
        yield "data: [DONE]\n\n"
        return

    try:
        client = genai.Client(api_key=api_key)
        
        # We use a synchronous generator wrapper in a thread if needed, but google-genai provides sync streaming
        # However, FastAPI StreamingResponse works best with async generators. We will yield from the sync stream.
        # genai SDK stream is sync by default unless async client is used.
        # There's an async client available in the SDK: `client.aio.models.generate_content_stream`
        response_stream = await client.aio.models.generate_content_stream(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.3,
            )
        )
        
        async for chunk in response_stream:
            if chunk.text:
                # SSE expects data: <content>\n\n
                # We need to ensure newlines in the chunk don't break SSE format
                # Replacing newlines with a specific token or just passing as is might break if not handled well,
                # but standard SSE can handle multiple data lines or we just serialize to JSON.
                # Let's yield standard SSE format:
                import json
                yield f"data: {json.dumps({'text': chunk.text})}\n\n"
        
        yield "data: [DONE]\n\n"
        
    except Exception as e:
        import json
        yield f"data: {json.dumps({'error': str(e)})}\n\n"
        yield "data: [DONE]\n\n"

@router.post("/stream")
async def chat_stream(request: dict):
    prompt = request.get("prompt", "")
    return StreamingResponse(generate_ai_stream(prompt), media_type="text/event-stream")
