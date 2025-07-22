import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UploadSimple, ArrowRight } from "@phosphor-icons/react";
import "./style.css";

const mockFrames = Array.from({ length: 36 }, (_, i) => `Frame ${i + 1}`);

export default function IndexPage() {
  const [step, setStep] = useState("upload");  // upload, select, view2
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const doUpload = file => {
    setFile(file);
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    fetch((import.meta.env.VITE_API_URL || "http://127.0.0.1:8000") + "/upload", {
      method: "POST",
      body: form,
    })
      .then(r => r.json())
      .then(() => setStep("select"))
      .finally(() => setUploading(false));
  };

  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) doUpload(f);
  };
  const openFileDialog = () => inputRef.current.click();

  const Btn = ({ children, onClick, active, disabled }) => (
    <button
      className={`btn btn-lg ${active ? "btn-secondary" : "btn-outline-secondary"} me-2${disabled ? " disabled" : ""}`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center border-bottom p-3">
        <div className="d-flex align-items-center gap-3">
          <img src="/mediafutures-logo.png" alt="Media Futures" style={{ height: 32 }} />
          <h4 className="mb-0 ms-2">Analytic Vision Dashboard</h4>
        </div>
        <div className="position-relative" ref={menuRef}>
          <Btn onClick={() => setMenuOpen(o => !o)}>Menu &#9776;</Btn>
          {menuOpen && (
            <div className="position-absolute end-0 mt-2 p-3 bg-white border rounded shadow" style={{ minWidth: 220 }}>
              <button className="btn btn-outline-secondary w-100 text-start mb-2">Account Settings</button>
              {step === "view2" && (
                <>
                  <button className="btn btn-outline-secondary w-100 text-start mb-2">Add Keyframe Viewer</button>
                  <button className="btn btn-outline-secondary w-100 text-start mb-2">Add Object Detection</button>
                  <button className="btn btn-outline-secondary w-100 text-start">Add Timeline Widget</button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={
        step === "upload" ? "flex-grow-1 d-flex justify-content-center align-items-center p-4" :
        step === "select" ? "flex-grow-1 d-flex flex-column p-4" :
        "flex-grow-1 d-flex flex-column justify-content-between p-4"
      }>
        {/* Upload Page */}
        {step === "upload" && (
          <div
            className="border rounded p-5 bg-white shadow text-center"
            style={{ minWidth: 360, cursor: 'pointer' }}
            onClick={openFileDialog}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); doUpload(e.dataTransfer.files[0]); }}
          >
            <UploadSimple size={56} className="mb-3 text-secondary" />
            <h5 className="mb-4">{uploading ? "Uploading..." : "Upload an image or video"}</h5>
            <div className="border rounded p-4 text-muted">Drag & drop a file here or click to browse</div>
            <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </div>
        )}

        {/* Keyframe Selection Page */}
        {step === "select" && (
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Select a Keyframe</h5>
              <Btn onClick={() => setStep("view2")}>Skip</Btn>
            </div>
            <div className="row g-3">
              {mockFrames.map((lbl, i) => (
                <div className="col-2" key={i}>
                  <div
                    className={`border rounded mb-1 ${selectedFrame === i ? 'border-primary' : ''}`}
                    style={{ height: 100, cursor: 'pointer' }}
                    onClick={() => setSelectedFrame(i)}
                  ></div>
                  <div className="text-center small">{lbl}</div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Btn onClick={() => setStep("view2")} disabled={selectedFrame === null}>
                Next <ArrowRight className="ms-2" />
              </Btn>
            </div>
          </div>
        )}

        {/* View2 Page */}
        {step === "view2" && (
          <>
            {/* Spacer to push preview and timeline to bottom */}
            <div className="flex-grow-1" />

            {/* Keyframe Preview Panel */}
            <div className="border rounded bg-light mb-2 mx-auto" style={{ width: '60%', height: 200 }} />
            <div className="mb-3 text-muted text-center">&lt;{selectedFrame + 1}&gt;</div>

            {/* Timeline strip pinned just above footer */}
            <div className="position-relative border rounded p-2">
              <div style={{ height: 60, background: '#ccc' }} />
              {selectedFrame !== null && (
                <div
                  className="position-absolute bg-white border rounded"
                  style={{
                    width: 80,
                    height: 60,
                    bottom: 0,
                    left: `calc((100% / 36) * ${selectedFrame} - 20px)`,
                  }}
                >
                  <div className="w-100 h-100 bg-secondary" />
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-top bg-white">
        <div className="container-fluid px-4 pt-3 d-flex">
          <Btn onClick={() => setStep("upload")} active={step === "upload"}>View 1</Btn>
          <Btn onClick={() => setStep("select")} active={step === "select"}>View 2</Btn>
          <Btn onClick={() => setStep("view2")} active={step === "view2"}>View 3</Btn>
          <div className="ms-auto">
            <Btn onClick={() => {}} active={false}>New View</Btn>
          </div>
        </div>
      </footer>
    </div>
  );
}
