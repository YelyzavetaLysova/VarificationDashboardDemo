import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadSimple } from "@phosphor-icons/react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
    setError("");
  };

  const handleClick = () => inputRef.current.click();

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a file to upload.");
      return;
    }
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/select-keyframe"); // update with your next page
    } catch (err) {
      setError("Upload failed. Please check backend logs.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
      {/* Navbar */}
      <div style={{ borderBottom: "1px solid #f2f2f2", height: 60, display: "flex", alignItems: "center", paddingLeft: 28 }}>
        <img src="/mediafutures-logo.png" height="28" alt="Media Futures" style={{ marginRight: 16 }} />
        <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: 0, color: "#222" }}>
          Analytic Vision Dashboard
        </span>
      </div>

      {/* Main content */}
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div
            className="upload-drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "1px solid #e2e7ef",
              borderRadius: 10,
              width: 400,
              padding: 40,
              background: "#fff",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 1px 10px 0 rgba(60,72,88,.07)",
              marginBottom: 8,
              transition: "box-shadow .2s"
            }}
            onClick={handleClick}
          >
            <input
              type="file"
              accept="image/*,video/*"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div style={{ marginBottom: 14 }}>
              <UploadSimple size={54} color="#b0b6c4" weight="duotone" />
            </div>
            <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 6 }}>
              Upload an image or video
            </div>
            <div style={{ color: "#222", fontSize: 16, marginBottom: 0 }}>
              Drag & drop a file here
            </div>
            <div style={{ color: "#9097a7", fontSize: 15, marginBottom: 0 }}>
              or click to browse
            </div>
            {file && (
              <div style={{ marginTop: 14, fontSize: 16, color: "#444" }}>{file.name}</div>
            )}
          </div>
        </form>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        <button
          className="btn btn-primary"
          type="button"
          style={{ marginTop: 12, width: 400, maxWidth: "90%" }}
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Bottom nav bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, width: "100%",
        background: "#f8fafd", borderTop: "1px solid #e2e7ef",
        display: "flex", justifyContent: "center", alignItems: "center", height: 52, zIndex: 99
      }}>
        <div style={{ display: "flex", gap: 0, width: 440 }}>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>View 1</button>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>View 2</button>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>View 3</button>
          <button className="btn btn-light px-4 py-2" style={{ color: "#6e7687", fontWeight: 500, borderRadius: 8, marginLeft: 16, border: "1px solid #e2e7ef", background: "#f2f5fb" }}>New View</button>
        </div>
      </div>
    </div>
  );
}
