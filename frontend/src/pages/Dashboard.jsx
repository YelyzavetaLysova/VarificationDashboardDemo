// src/pages/Dashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { UploadSimple } from "@phosphor-icons/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

const mockFrames = Array.from({ length: 36 }, (_, i) => `Frame ${i + 1}`);

export default function Dashboard() {
  const [step, setStep] = useState("upload");
  const [uploading, setUploading] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const openFileDialog = () => inputRef.current.click();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) uploadFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) uploadFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((r) => r.json())
      .then(() => setStep("select"))
      .finally(() => setUploading(false));
  };

  // Footer tabs: match selected state and screenshot style
  const FooterTabs = () => (
    <Navbar fixed="bottom" bg="white" className="shadow-sm">
      <Container className="d-flex justify-content-center py-2">
        <Button
          variant="link"
          className="mx-1 px-4 text-dark"
          style={{ fontWeight: 400, background: "#fff" }}
          onClick={() => setStep('upload')}
        >View 1</Button>
        <Button
          variant="link"
          className="mx-1 px-4 text-dark"
          style={{ fontWeight: 400, background: "#fff" }}
          onClick={() => setStep('select')}
        >View 2</Button>
        <Button
          variant="link"
          className="mx-1 px-4 text-dark"
          style={{ fontWeight: 400, background: "#fff" }}
          onClick={() => setStep('view2')}
        >View 3</Button>
        <Button
          variant="light"
          className="mx-1 px-4"
          style={{ fontWeight: 400, background: "#f3f4f6", border: "1.5px solid #e5e7eb", color: "#222" }}
        >New View</Button>
      </Container>
    </Navbar>
  );

  // Modern menu for menuOpen logic (optional for your flow)
  const MenuDropdown = () =>
    menuOpen && (
      <div className="position-absolute end-0 mt-2 p-3 bg-white border rounded shadow" style={{ minWidth: 200, zIndex: 10 }}>
        <Button variant="outline-secondary" className="w-100 text-start mb-2">
          Account Settings
        </Button>
        {step === "view2" && (
          <>
            <Button variant="outline-secondary" className="w-100 text-start mb-2">Add Keyframe Viewer</Button>
            <Button variant="outline-secondary" className="w-100 text-start mb-2">Add Object Detection</Button>
            <Button variant="outline-secondary" className="w-100 text-start">Add Timeline Widget</Button>
          </>
        )}
      </div>
    );

  // TabBtn component for menu (keep your previous style)
  const TabBtn = ({ label, onClick, active }) => (
    <Button
      variant={active ? "primary" : "outline-primary"}
      className="me-2 rounded-pill"
      onClick={onClick}
    >
      {label}
    </Button>
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Header */}
      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container>
          <Navbar.Brand href="/dashboard" className="d-flex align-items-center gap-2">
            <img src="/mediafutures-logo.png" alt="Media Futures" height={32} />
            <span className="h5 mb-0">Analytic Vision Dashboard</span>
          </Navbar.Brand>
          <Nav ref={menuRef} className="ms-auto position-relative">
            <TabBtn label="Menu ☰" onClick={() => setMenuOpen((o) => !o)} active={menuOpen} />
            <MenuDropdown />
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      {step === "upload" && (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              minWidth: 370,
              maxWidth: 400,
              minHeight: 270,
              boxShadow: "0 2px 8px rgba(20,40,80,0.05)",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={openFileDialog}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="py-3 px-3 w-100 text-center">
              <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 18 }}>
                {uploading ? "Uploading…" : "Upload an image or video"}
              </div>
              <div
                style={{
                  border: "1.5px dashed #d1d5db",
                  borderRadius: 7,
                  padding: "36px 0 18px 0",
                  margin: "0 12px",
                  cursor: "pointer",
                  background: "#fafbfc",
                  transition: "border-color 0.2s",
                }}
              >
                <UploadSimple size={56} className="mb-2 text-secondary" />
                <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 2 }}>
                  Drag &amp; drop a file here
                </div>
                <div
                  className="text-muted"
                  style={{ fontSize: 13, color: "#888" }}
                >
                  or <span style={{ color: "#339" }}>click to browse</span>
                </div>
                <input
                  type="file"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "select" && (
        <Container className="flex-grow-1 py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Select a Keyframe</h5>
            <TabBtn label="Skip" onClick={() => setStep("view2")} active={false} />
          </div>
          <div className="row g-3">
            {mockFrames.map((lbl, i) => (
              <div className="col-2" key={i}>
                <div
                  className={`border rounded mb-1 ${selectedFrame === i ? 'border-primary' : ''}`}
                  style={{ height: 100, cursor: 'pointer' }}
                  onClick={() => setSelectedFrame(i)}
                />
                <div className="text-center small">{lbl}</div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              onClick={() => setStep("view2")}
              disabled={selectedFrame === null}
            >
              Next →
            </Button>
          </div>
        </Container>
      )}

      {step === "view2" && (
        <div className="flex-grow-1 d-flex flex-column justify-content-between p-4">
          <div className="text-center">
            <div className="shadow-sm mx-auto mb-2"
              style={{ width: '60%', height: 200, background: "#fff", borderRadius: 12, border: "1px solid #eee" }} />
            <div className="text-muted mb-4">&lt;{selectedFrame + 1}&gt;</div>
          </div>
          <div className="position-relative">
            <div className="border rounded p-2" style={{ background: '#f0f0f0', height: 80 }} />
            {selectedFrame !== null && (
              <div
                className="position-absolute bg-primary rounded"
                style={{ width: 8, height: 80, bottom: 2, left: `calc((100% / 36) * ${selectedFrame} + 2px)` }}
              />
            )}
          </div>
        </div>
      )}

      {/* Footer Tabs */}
      <FooterTabs />
    </div>
  );
}
