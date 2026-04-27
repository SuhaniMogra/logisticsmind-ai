from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import shutil
import os

# AUTO-CREATE REQUIRED STORAGE FOLDERS
os.makedirs("storage/uploads", exist_ok=True)
os.makedirs("storage/reports", exist_ok=True)

from agents.planner_agent import generate_subqueries
from agents.research_agent import perform_research
from agents.summarizer_agent import summarize_results
from agents.report_agent import save_report

from doc_intelligence.loader import load_document
from doc_intelligence.vector_store import create_vector_store, load_vector_store
from doc_intelligence.rag_engine import ask_document

app = FastAPI(title="LogisticsMind AI")

# FRONTEND BUILD PATH (Docker)
frontend_path = "/app/frontend_dist"

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API HEALTH ROUTE
@app.get("/api")
def home():
    return {"message": "LogisticsMind Backend Running Successfully"}


# Serve React frontend if Docker build exists
if os.path.exists(frontend_path):

    # Static assets
    assets_path = os.path.join(frontend_path, "assets")

    if os.path.exists(assets_path):
        app.mount(
            "/assets",
            StaticFiles(directory=assets_path),
            name="assets"
        )

    # Frontend Home
    @app.get("/")
    async def serve_frontend():
        return FileResponse(os.path.join(frontend_path, "index.html"))

    # React Router SPA fallback
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):

        # Preserve backend/API routes
        backend_routes = [
            "api",
            "research",
            "upload-doc",
            "ask-doc",
            "openapi.json",
            "docs",
            "redoc"
        ]

        if any(full_path.startswith(route) for route in backend_routes):
            raise HTTPException(status_code=404, detail="Not Found")

        requested_file = os.path.join(frontend_path, full_path)

        # Serve direct file if exists
        if os.path.exists(requested_file) and os.path.isfile(requested_file):
            return FileResponse(requested_file)

        # Otherwise React handles route
        return FileResponse(os.path.join(frontend_path, "index.html"))


# RESEARCH AGENT
@app.post("/research")
def research(query: str):
    subqueries = generate_subqueries(query)

    all_results = []

    for q in subqueries:
        results = perform_research(q)
        all_results.extend(results)

    summary = summarize_results(query, all_results)

    report_paths = save_report(query, summary)

    return {
        "query": query,
        "summary": summary,
        "reports": report_paths
    }


# DOC UPLOAD
@app.post("/upload-doc")
async def upload_doc(file: UploadFile = File(...)):
    safe_filename = file.filename.replace("/", "_").replace("\\", "_")

    upload_path = f"storage/uploads/{safe_filename}"

    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = load_document(upload_path)

    create_vector_store(text)

    return {
        "filename": safe_filename,
        "message": "Document uploaded and indexed successfully."
    }


# DOC QA
@app.post("/ask-doc")
def ask_doc(question: str):
    vectorstore = load_vector_store()

    answer = ask_document(question, vectorstore)

    return {
        "question": question,
        "answer": answer
    }