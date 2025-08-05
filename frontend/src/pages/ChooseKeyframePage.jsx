// src/pages/ChooseKeyframePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Logo from "../components/Logo.jsx";
import SettingsMenu from "../components/SettingsMenu.jsx";
import BottomNav from "../components/BottomNav.jsx";

export default function ChooseKeyframePage() {
  const { videoId } = useParams();
  const [frames, setFrames] = useState([]);           // will hold [{ index, image_url, … }, …]
  const [selectedIdx, setSelectedIdx] = useState(null);
  const navigate = useNavigate();

  // 1) Fetch the video + its frames on mount
  useEffect(() => {
    if (!videoId) return;

    axios
      .get(`/videos/${videoId}`)
      .then((res) => {
        // API returns VideoModel; we only care about the frames list
        setFrames(res.data.frames || []);
      })
      .catch((err) => {
        console.error("Failed to fetch video frames:", err);
      });
  }, [videoId]);

  const handleSelect = (idx) => setSelectedIdx(idx);
  const handleNext   = () => navigate("/workspace");
  const handleSkip   = () => navigate("/workspace");

  // Build a fixed grid spot for frames 0–35
  // If you saved fewer than 36 frames, missing indexes will render a placeholder.
  const TOTAL_SLOTS = 36;
  const slots = Array.from({ length: TOTAL_SLOTS }, (_, i) => {
    // try to find a frame with index === i
    const found = frames.find((f) => f.index === i);
    return {
      idx: i,
      url: found?.image_url ?? null,
    };
  });

  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
      {/* --- Navbar --- */}
      <div
        style={{
          borderBottom: "1px solid #f2f2f2",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
        }}
      >
        <Logo />
        <SettingsMenu onLogout={() => navigate("/login")} />
      </div>

      <div className="container" style={{ maxWidth: 1200, margin: "36px auto 0" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 style={{ fontWeight: 600, fontSize: 26 }}>Select a Keyframe</h3>
          <button
            className="btn btn-link"
            style={{ color: "#888", fontWeight: 500, fontSize: 18, textDecoration: "none" }}
            onClick={handleSkip}
          >
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
          {slots.map(({ idx, url }) => (
            <div
              key={idx}
              tabIndex={0}
              onClick={() => handleSelect(idx)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(idx)}
              style={{
                position: "relative",
                border: selectedIdx === idx ? "2px solid #27b86f" : "1.5px solid #d4d7df",
                borderRadius: 8,
                background: "#f7f9fa",
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: selectedIdx === idx ? "0 0 0 2px #b1f0ce" : "none",
                outline: "none",
                transition: "border .15s, box-shadow .15s",
                overflow: "hidden",
              }}
            >
              {url ? (
                <img
                  src={url}
                  alt={`Frame ${idx}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ color: "#bbb", fontSize: 14 }}>No frame</div>
              )}
              {/* index label overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 4,
                  right: 6,
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  fontSize: 12,
                  padding: "2px 4px",
                  borderRadius: 4,
                }}
              >
                #{idx}
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary btn-lg d-flex align-items-center"
            style={{ fontWeight: 500, fontSize: 20, padding: "6px 24px" }}
            disabled={selectedIdx === null}
            onClick={handleNext}
          >
            Next{" "}
            <span
              style={{
                marginLeft: 10,
                fontSize: 26,
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              →
            </span>
          </button>
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
