// src/components/BottomNav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * BottomNav: fixed footer navigation for dashboard views
 */
export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#f8fafd",
        borderTop: "1px solid #e2e7ef",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 52,
        zIndex: 99,
      }}
    >
      <div style={{ display: "flex", gap: 0, width: 440 }}>
        <button
          className="btn btn-link px-4 py-2"
          style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}
          onClick={() => navigate("/view/1")}
        >
          View 1
        </button>
        <button
          className="btn btn-link px-4 py-2"
          style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}
          onClick={() => navigate("/view/2")}
        >
          View 2
        </button>
        <button
          className="btn btn-link px-4 py-2"
          style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}
          onClick={() => navigate("/view/3")}
        >
          View 3
        </button>
        <button
          className="btn btn-light px-4 py-2"
          style={{
            color: "#6e7687",
            fontWeight: 500,
            borderRadius: 8,
            marginLeft: 16,
            border: "1px solid #e2e7ef",
            background: "#f2f5fb",
          }}
          onClick={() => navigate("/upload")}
        >
          New View
        </button>
      </div>
    </div>
  );
}
