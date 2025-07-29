// src/pages/UploadPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm.jsx";

export default function UploadPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
      {/* Navbar… same as before */}
      <div style={{ /*…*/ }}>
        {/*…*/ }
      </div>

      {/* Main content */}
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
        <UploadForm
          onUploadSuccess={() => navigate("/select-keyframe")}
          apiUrl={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/upload/`}
        />
      </div>

      {/* Footer nav bar… same as before */}
      <div style={{ /*…*/ }}>
        {/*…*/ }
      </div>
    </div>
  );
}
