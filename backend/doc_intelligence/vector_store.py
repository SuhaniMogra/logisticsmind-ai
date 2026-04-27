from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from doc_intelligence.embeddings import get_embeddings
import os

VECTOR_PATH = "faiss_index"

def create_vector_store(text):
    splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200
    )

    docs = splitter.split_text(text)

    embeddings = get_embeddings()

    vectorstore = FAISS.from_texts(docs, embeddings)

    vectorstore.save_local(VECTOR_PATH)

def load_vector_store():
    embeddings = get_embeddings()

    if not os.path.exists(VECTOR_PATH):
        return None

    return FAISS.load_local(
        VECTOR_PATH,
        embeddings,
        allow_dangerous_deserialization=True
    )