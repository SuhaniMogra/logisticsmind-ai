import os
import docx2txt
from pypdf import PdfReader

def load_document(file_path):
    ext = os.path.splitext(file_path)[1].lower()

    # TXT FILE
    if ext == ".txt":
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()

    # PDF FILE
    elif ext == ".pdf":
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text

    # DOCX FILE
    elif ext == ".docx":
        return docx2txt.process(file_path)

    else:
        return "Unsupported file format."