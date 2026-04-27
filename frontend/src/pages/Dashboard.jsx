import { Search, FileText, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStats } from "../services/stats";

function Dashboard() {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    const updateStats = () => {
      setStats(getStats());
    };

    window.addEventListener("statsUpdated", updateStats);

    return () => {
      window.removeEventListener("statsUpdated", updateStats);
    };
  }, []);
  const cards = [
    {
      title: "Research Agent",
      description:
        "Autonomous AI agent that searches the web and synthesizes logistics intelligence reports.",
      icon: <Search size={24} />,
      color: "#00ffd0",
      path: "/research",
      tags: ["CrewAI", "LangChain", "Web Search"],
    },
    {
      title: "Doc Intelligence",
      description:
        "Upload PDFs and manuals. Ask questions and get grounded answers with source citations.",
      icon: <FileText size={24} />,
      color: "#3b82f6",
      path: "/docs",
      tags: ["RAG", "FAISS", "Embeddings"],
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            background: "#052e2b",
            padding: "12px",
            borderRadius: "14px",
            color: "#00ffd0",
          }}
        >
          <Zap size={28} />
        </div>

        <div>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "800",
              lineHeight: "1",
            }}
          >
            Logistics<span style={{ color: "#00ffd0" }}>Mind</span>
          </h1>

          <p style={{ color: "#64748b", marginTop: "8px" }}>
            AI INTELLIGENCE PLATFORM
          </p>
        </div>
      </div>

      <p
        style={{
          marginTop: "30px",
          color: "#94a3b8",
          fontSize: "18px",
          maxWidth: "900px",
          lineHeight: "1.8",
        }}
      >
        An integrated platform combining autonomous web research and document
        intelligence — purpose-built for logistics professionals.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {[
          [stats.researchReports, "RESEARCH REPORTS"],
  	  [stats.indexedDocs, "INDEXED DOCUMENTS"],
  	  ["2", "AI MODULES ACTIVE"],].map((item, index) => (
          <div
            key={index}
            style={{
              background: "#071129",
              padding: "28px",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h2 style={{ fontSize: "48px" }}>{item[0]}</h2>
            <p style={{ color: "#64748b", marginTop: "10px" }}>{item[1]}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
          marginTop: "40px",
        }}
      >
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            style={{
              background: "#071129",
              borderRadius: "24px",
              padding: "30px",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: "280px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  background: `${card.color}20`,
                  color: card.color,
                  padding: "14px",
                  borderRadius: "14px",
                }}
              >
                {card.icon}
              </div>

              <ArrowRight color="#64748b" />
            </div>

            <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>
              {card.title}
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "18px",
              }}
            >
              {card.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "24px",
                flexWrap: "wrap",
              }}
            >
              {card.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: "#0f172a",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    color: "#94a3b8",
                    fontSize: "14px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;