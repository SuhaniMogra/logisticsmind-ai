from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_BASE_URL

client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url=OPENAI_BASE_URL
)

def ask_document(question, vectorstore):
    if vectorstore is None:
        return "No document has been uploaded yet."

    docs = vectorstore.similarity_search(question, k=4)

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
    You are a document intelligence assistant.

    Use the document context below to answer accurately.

    DOCUMENT:
    {context}

    QUESTION:
    {question}

    Provide a clear, structured answer.
    """

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content