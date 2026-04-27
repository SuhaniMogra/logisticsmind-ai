from tavily import TavilyClient
from config import TAVILY_API_KEY
import time

client = TavilyClient(api_key=TAVILY_API_KEY)

def perform_research(query):
    retries = 3

    for attempt in range(retries):
        try:
            response = client.search(
                query=query,
                search_depth="basic",   # More stable than advanced
                max_results=5
            )

            results = []

            for r in response.get("results", []):
                results.append({
                    "title": r.get("title", ""),
                    "content": r.get("content", ""),
                    "url": r.get("url", "")
                })

            return results

        except Exception as e:
            print(f"Tavily Error (Attempt {attempt + 1}): {e}")
            time.sleep(2)

    # Fallback if Tavily completely fails
    return [
        {
            "title": "Research temporarily unavailable",
            "content": f"Unable to fetch live web data for query: {query}. Tavily connection failed.",
            "url": ""
        }
    ]