import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter / OpenAI Compatible
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://openrouter.ai/api/v1")

# Tavily
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")