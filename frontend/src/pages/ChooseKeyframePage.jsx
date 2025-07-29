import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FRAMES = Array.from({ length: 36 }, (_, i) => i + 1);

export default function ChooseKeyframePage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (index) => setSelected(index);

  const handleNext = () => {
    // You can send selected frame to backend here if needed
    navigate("/workspace");
  };

  const handleSkip = () => {
    // You can send info about skipping here if needed
    navigate("/workspace");
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

      <div className="container" style={{ maxWidth: 1200, margin: "36px auto 0" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 style={{ fontWeight: 600, fontSize: 26 }}>Select a Keyframe</h3>
          <button className="btn btn-link" style={{ color: "#888", fontWeight: 500, fontSize: 18, textDecoration: "none" }} onClick={handleSkip}>
            Skip
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            gap: 16,
            background: "#fff",
            border: "1px solid #e2e7ef",
            borderRadius: 8,
            padding: "28px 12px 18px",
            marginBottom: 32,
            boxShadow: "0 1px 10px 0 rgba(60,72,88,.04)",
          }}
        >
          {FRAMES.map((num, idx) => (
            <div
              key={num}
              tabIndex={0}
              onClick={() => handleSelect(idx)}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleSelect(idx)}
              style={{
                border: selected === idx ? "2px solid #27b86f" : "1.5px solid #d4d7df",
                borderRadius: 8,
                background: "#f7f9fa",
                height: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                cursor: "pointer",
                boxShadow: selected === idx ? "0 0 0 2px #b1f0ce" : "none",
                outline: "none",
                transition: "border .15s, box-shadow .15s"
              }}
            >
              {/* Frame preview could go here in the future */}
              <div style={{
                width: "100%",
                background: "none",
                borderTop: "1px solid #e5e5e5",
                padding: "6px 0 3px",
                textAlign: "center",
                fontSize: 15,
                color: "#444"
              }}>
                Frame {num}
              </div>
            </div>
          ))}
        </div>
        {/* Next button */}
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary btn-lg d-flex align-items-center"
            style={{ fontWeight: 500, fontSize: 20, padding: "6px 24px" }}
            disabled={selected === null}
            onClick={handleNext}
          >
            Next <span style={{ marginLeft: 10, fontSize: 26, lineHeight: 1, display: "flex", alignItems: "center" }}>→</span>
          </button>
        </div>
      </div>

      {/* Footer nav */}
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
