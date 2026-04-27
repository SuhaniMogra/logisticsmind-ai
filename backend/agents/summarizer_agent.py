from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_BASE_URL

client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url=OPENAI_BASE_URL
)


def summarize_results(query, results):
    combined_text = "\n".join(results[:10])

    prompt = f"""
    Summarize the following research for: {query}

    Research Data:
    {combined_text}

    Provide:
    - Key trends
    - Risks
    - Opportunities
    - Future outlook
    """

    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a logistics and supply chain research analyst."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content