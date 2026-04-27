import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ResearchAgent from "./pages/ResearchAgent";
import DocIntelligence from "./pages/DocIntelligence";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#020817",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/research" element={<ResearchAgent />} />
          <Route path="/docs" element={<DocIntelligence />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;