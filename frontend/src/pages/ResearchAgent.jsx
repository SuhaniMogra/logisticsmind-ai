import { useState } from "react";
import { Search, Play } from "lucide-react";
import { researchQuery } from "../services/api";
import { incrementResearchReports } from "../services/stats";
function ResearchAgent() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleQueries = [
    "Global container shipping rate trends Q4 2024",
    "Last-mile delivery technology innovations",
    "Supply chain disruptions and mitigation strategies",
    "Cold chain pharmaceutical logistics challenges",
    "Port automation and robotics trends",
  ];

  const handleResearch = async () => {
    if (!query) return;

    try {
      setLoading(true);

      const response = await researchQuery(query);

      setResult(response.data.summary || "No summary 	returned.");
      incrementResearchReports();
      window.dispatchEvent(new Event("statsUpdated"));
    } catch (error) {
      console.error(error);
      setResult("Error fetching research.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "64px", fontWeight: "800" }}>
        Research Agent
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "10px",
          fontSize: "18px",
        }}
      >
        Autonomous multi-agent system that searches the web and synthesizes
        logistics intelligence.
      </p>

      {/* Query Box */}
      <div
        style={{
          background: "#071129",
          marginTop: "30px",
          padding: "30px",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#64748b",
            marginBottom: "20px",
          }}
        >
          <Search size={18} />
          <span>RESEARCH QUERY</span>
        </div>

        <textarea
          placeholder="e.g. What are the current trends in autonomous last-mile delivery?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            background: "#0b1120",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "white",
            padding: "20px",
            borderRadius: "14px",
            fontSize: "18px",
            resize: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          <select
            style={{
              background: "#0b1120",
              color: "white",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <option>Standard — ~2 min — detailed</option>
          </select>

          <button
            onClick={handleResearch}
            style={{
              background: "#00ffd0",
              color: "black",
              padding: "14px 26px",
              border: "none",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Play size={18} />
            {loading ? "Researching..." : "Start Research"}
          </button>
        </div>

        {/* Sample Queries */}
        <div style={{ marginTop: "24px" }}>
          <p style={{ color: "#64748b", marginBottom: "12px" }}>
            SAMPLE QUERIES
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {sampleQueries.map((item, index) => (
              <button
                key={index}
                onClick={() => setQuery(item)}
                style={{
                  background: "#0f172a",
                  color: "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Knowledge Repository */}
      <div
        style={{
          background: "#071129",
          marginTop: "30px",
          minHeight: "350px",
          padding: "30px",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h3 style={{ color: "#64748b" }}>
          KNOWLEDGE REPOSITORY (0 REPORTS)
        </h3>

        <div
          style={{
            marginTop: "80px",
            textAlign: "center",
            color: "#64748b",
            whiteSpace: "pre-wrap",
          }}
        >
          {result || "No reports yet\n\nRun a research query above to generate and save your first report."}
        </div>
      </div>
    </div>
  );
}

export default ResearchAgent;