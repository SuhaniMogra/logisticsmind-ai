from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def summarize_results(query, research_data):
    combined_text = "\n".join([item["content"] for item in research_data])

    prompt = f"""
    Research Query: {query}

    Based on the following research:
    {combined_text}

    Generate:
    1. Executive Summary
    2. Key Insights
    3. Risks
    4. Opportunities
    5. Final Conclusion
    """

    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content