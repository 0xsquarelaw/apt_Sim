from google import genai
from dotenv import load_dotenv
import os
from typing import Optional

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

def generate_ai_response(prompt: str, model: str = "gemini-2.0-flash") -> Optional[str]:
    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return None

if __name__ == "__main__":
    result = generate_ai_response("Explain how AI works")
    if result:
        print(result)
    else:
        print("Failed to generate response")