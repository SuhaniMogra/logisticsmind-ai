import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  FileText,
  Zap
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Research Agent", icon: <Search size={20} />, path: "/research" },
    { name: "Doc Intelligence", icon: <FileText size={20} />, path: "/docs" },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#071129",
        minHeight: "100vh",
        padding: "20px",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#052e2b",
              padding: "10px",
              borderRadius: "12px",
              color: "#00ffd0",
            }}
          >
            <Zap size={22} />
          </div>

          <div>
            <h2 style={{ fontSize: "28px", fontWeight: "800" }}>
              LogisticsMind
            </h2>
            <p style={{ color: "#64748b", fontSize: "12px" }}>
              AI PLATFORM
            </p>
          </div>
        </div>

        {/* Menu */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {menu.map((item, index) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  background: active ? "#052e2b" : "transparent",
                  color: active ? "#00ffd0" : "#94a3b8",
                  border: active
                    ? "1px solid rgba(0,255,208,0.2)"
                    : "1px solid transparent",
                  transition: "0.3s",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "#00ffd0",
          fontSize: "15px",
        }}
      >
        ● API Connected
      </div>
    </div>
  );
}

export default Sidebar;