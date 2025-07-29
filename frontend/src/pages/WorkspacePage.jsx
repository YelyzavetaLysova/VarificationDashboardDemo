import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CaretDown, List } from "@phosphor-icons/react";

export default function WorkspacePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
      {/* Navbar */}
      <div style={{ borderBottom: "1px solid #f2f2f2", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px 0 12px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button style={{
            background: "none", border: "none", padding: "8px 8px 8px 2px", marginRight: 8,
            outline: "none", boxShadow: "none", cursor: "pointer"
          }}>
            <List size={32} color="#222" weight="regular" />
          </button>
          <img src="/mediafutures-logo.png" height="28" alt="Media Futures" style={{ marginRight: 16 }} />
          <span style={{ fontWeight: 700, fontSize: 24, color: "#222" }}>
            Analytic Vision Dashboard
          </span>
        </div>
        <div>
          <button className="btn btn-outline-light" style={{
            border: "1px solid #dadada",
            borderRadius: 6,
            fontWeight: 500,
            fontSize: 15,
            color: "#222",
            boxShadow: "none"
          }}>
            Choose configuration <CaretDown size={20} weight="regular" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
        {/* Centered image */}
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
          alt="Workspace"
          style={{
            maxWidth: 520,
            maxHeight: 300,
            borderRadius: 14,
            border: "1px solid #f2f2f2",
            margin: "30px 0 20px"
          }}
        />

        {/* Timeline/Keyframes */}
        <div style={{
          width: 720,
          maxWidth: "98vw",
          margin: "0 auto",
          background: "#fff",
          border: "1.3px solid #e2e7ef",
          borderRadius: 11,
          padding: "22px 14px 15px 14px",
          boxShadow: "0 1px 10px 0 rgba(60,72,88,.04)"
        }}>
          <div style={{ width: "100%", position: "relative" }}>
            {/* Timeline image */}
            <img
              src="https://i.imgur.com/zAuYGQv.png"
              alt="Timeline preview"
              style={{ width: "100%", height: 56, objectFit: "cover", borderRadius: 6 }}
            />
            {/* Playhead */}
            <div style={{
              position: "absolute", top: 0, left: "32%",
              width: 3, height: 56, background: "#25ba72", borderRadius: 2,
              boxShadow: "0 0 6px #25ba72bb"
            }} />
            {/* Time label */}
            <div style={{
              position: "absolute", left: "31%",
              top: -26, background: "#fff", border: "1px solid #e2e7ef", borderRadius: 6,
              padding: "1.5px 10px", fontWeight: 500, fontSize: 15, color: "#222",
              boxShadow: "0 2px 8px #ebefef75"
            }}>
              3m 34s 47ms
            </div>
            {/* + button */}
            <button
              style={{
                position: "absolute", right: -6, top: 10, width: 38, height: 38,
                background: "#f5f8fa", border: "1.2px solid #d8dee7", borderRadius: 10,
                color: "#555", fontWeight: 700, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 2px #eee"
              }}
              title="Add"
            >+</button>
          </div>
        </div>
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
