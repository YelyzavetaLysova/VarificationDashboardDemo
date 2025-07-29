// src/components/UploadForm.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { UploadSimple } from "@phosphor-icons/react";

/**
 * UploadForm: isolated file upload form for uploading image/video.
 * Props:
 * - onUploadSuccess: callback invoked after successful upload
 * - apiUrl: optional override of upload endpoint
 */
export default function UploadForm({ onUploadSuccess, apiUrl = "http://127.0.0.1:8000/upload/" }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

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

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploadSuccess?.(res.data);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please check backend logs.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        style={{
          border: "1px solid #e2e7ef",
          borderRadius: 10,
          width: "100%",
          padding: 40,
          background: "#fff",
          textAlign: "center",
          cursor: "pointer",
          boxShadow: "0 1px 10px 0 rgba(60,72,88,.07)",
          transition: "box-shadow .2s",
          marginBottom: 8,
        }}
      >
        <input
          type="file"
          accept="image/*,video/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <UploadSimple size={54} color="#b0b6c4" weight="duotone" style={{ marginBottom: 14 }} />
        <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 6 }}>Upload an image or video</div>
        <div style={{ color: "#222", fontSize: 16, marginBottom: 0 }}>Drag & drop a file here</div>
        <div style={{ color: "#9097a7", fontSize: 15, marginBottom: 0 }}>or click to browse</div>
        {file && <div style={{ marginTop: 14, fontSize: 16, color: "#444" }}>{file.name}</div>}
      </div>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={uploading}
        style={{ marginTop: 8 }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
