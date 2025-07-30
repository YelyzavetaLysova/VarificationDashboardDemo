// src/pages/UploadPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm.jsx";
import Logo from "../components/Logo.jsx";
import SettingsMenu from "../components/SettingsMenu.jsx";

export default function UploadPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
      {/* Navbar */}
      <div style={{
        borderBottom: "1px solid #f2f2f2",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
      }}>
        <Logo />
        <SettingsMenu onLogout={() => navigate("/login")} />
      </div>

      {/* Main content */}
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "85vh" }}
      >
        <UploadForm
          onUploadSuccess={() => navigate("/select-keyframe")}
          apiUrl={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/upload/`}
        />
      </div>

      {/* Footer nav bar */}
      <div style={{
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
      }}>
        <div style={{ display: "flex", gap: 0, width: 440 }}>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>
            View 1
          </button>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>
            View 2
          </button>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>
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
          >
            New View
          </button>
        </div>
      </div>
    </div>
  );
}
