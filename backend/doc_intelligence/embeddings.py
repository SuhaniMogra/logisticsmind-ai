from langchain_community.embeddings import OpenAIEmbeddings
from config import OPENAI_API_KEY, OPENAI_BASE_URL

def get_embeddings():
    return OpenAIEmbeddings(
        openai_api_key=OPENAI_API_KEY,
        openai_api_base=OPENAI_BASE_URL,
        model="text-embedding-3-small"
    )
    