from fpdf import FPDF
import os

def save_report(query, content):
    safe_name = query.replace(" ", "_").replace("/", "_")
    txt_path = f"storage/reports/{safe_name}.txt"
    pdf_path = f"storage/reports/{safe_name}.pdf"

    # Save TXT
    with open(txt_path, "w", encoding="utf-8") as file:
        file.write(content)

    # Save PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_font("Arial", size=12)

    for line in content.split("\n"):
        try:
            pdf.multi_cell(0, 10, line.encode("latin-1", "replace").decode("latin-1"))
        except:
            pdf.multi_cell(0, 10, "Encoding issue in line.")

    pdf.output(pdf_path)

    return {
        "txt_report": txt_path,
        "pdf_report": pdf_path
    }
    