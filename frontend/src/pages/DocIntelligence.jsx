import { useState } from "react";
import { Upload, MessageSquare } from "lucide-react";
import { uploadDocument, askDocument } from "../services/api";
import { incrementIndexedDocs } from "../services/stats";

function DocIntelligence() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "What are the key findings of this document?",
    "Summarize the main logistics challenges mentioned.",
    "What regulations are discussed?",
    "What are the recommendations for supply chain optimization?",
    "List all statistics and data points mentioned.",
  ];

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadDocument(formData);
      setUploadMessage(response.data.message);
      incrementIndexedDocs();
      window.dispatchEvent(new Event("statsUpdated"));
    } catch (error) {
      console.error(error);
      setUploadMessage("Upload failed.");
    }
  };

  const handleAsk = async () => {
    if (!question) return;

    try {
      setLoading(true);

      const response = await askDocument(question);

      setAnswer(response.data.answer || "No answer returned.");
    } catch (error) {
      console.error(error);
      setAnswer("Error fetching answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "64px", fontWeight: "800" }}>
        Document Intelligence
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "10px",
          fontSize: "18px",
        }}
      >
        Upload logistics documents and ask questions. Answers are grounded
        strictly in your documents.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        {/* Left Panel */}
        <div>
          {/* Upload Box */}
          <div
            style={{
              background: "#071129",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
              border: "2px dashed rgba(255,255,255,0.08)",
            }}
          >
            <Upload size={42} color="#64748b" />

            <p style={{ marginTop: "20px", fontSize: "24px" }}>
              Drop PDF / TXT / MD
            </p>

            <p style={{ color: "#64748b", marginTop: "10px" }}>
              or click to browse
            </p>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginTop: "20px", color: "white" }}
            />

            <button
              onClick={handleUpload}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "14px",
                background: "#00ffd0",
                color: "black",
                border: "none",
                borderRadius: "12px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Upload Document
            </button>

            <p style={{ marginTop: "14px", color: "#00ffd0" }}>
              {uploadMessage}
            </p>
          </div>

          {/* Knowledge Base */}
          <div
            style={{
              background: "#071129",
              borderRadius: "24px",
              padding: "24px",
              marginTop: "24px",
              minHeight: "150px",
            }}
          >
            <h3 style={{ color: "#64748b" }}>KNOWLEDGE BASE (1)</h3>

            <p
              style={{
                marginTop: "40px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              {file ? file.name : "No documents uploaded"}
            </p>
          </div>

          {/* Sample Questions */}
          <div
            style={{
              background: "#071129",
              borderRadius: "24px",
              padding: "24px",
              marginTop: "24px",
            }}
          >
            <h3 style={{ color: "#64748b", marginBottom: "20px" }}>
              SAMPLE QUESTIONS
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sampleQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(q)}
                  style={{
                    background: "#0f172a",
                    color: "#94a3b8",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "14px",
                    borderRadius: "12px",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div
          style={{
            background: "#071129",
            borderRadius: "24px",
            padding: "30px",
            minHeight: "750px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#64748b",
              marginBottom: "24px",
            }}
          >
            <MessageSquare size={20} />
            <span>DOCUMENT Q&A</span>
          </div>

          <div
            style={{
              textAlign: "center",
              color: "#64748b",
              marginTop: answer ? "0" : "180px",
              whiteSpace: "pre-wrap",
              fontSize: "18px",
            }}
          >
            {answer ||
              "Ask your documents\n\nUpload a document and ask anything about its content. Answers are grounded in your files only."}
          </div>

          {/* Question Box */}
          <div style={{ marginTop: "40px" }}>
            <textarea
              placeholder="Ask anything about your uploaded document..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                background: "#0b1120",
                color: "white",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "18px",
                fontSize: "18px",
                resize: "none",
              }}
            />

            <button
              onClick={handleAsk}
              style={{
                marginTop: "16px",
                background: "#00ffd0",
                color: "black",
                border: "none",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {loading ? "Thinking..." : "Ask Document"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocIntelligence;