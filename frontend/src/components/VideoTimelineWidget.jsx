// src/components/VideoTimelineWidget.jsx
import React, { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import WidgetContainer from "./WidgetContainer.jsx";

/**
 * VideoTimelineWidget: displays a keyframe image and interactive timeline.
 * It will fill its container, but has a built-in min-height to maintain
 * a consistent default size.
 */
export default function VideoTimelineWidget({ id, onRemove }) {
  const navigate = useNavigate();
  const [timeMs, setTimeMs] = useState(214000); // e.g. 3m34s
  const durationMs = 360000; // e.g. 6m

  const fmt = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const msPart = ms % 1000;
    return `${m}m ${s}s ${msPart}ms`;
  };

  const handleSlider = (e) => setTimeMs(Number(e.target.value));
  const handlePlus   = () => navigate("/upload");

  return (
    <WidgetContainer id={id} onRemove={onRemove}>
      <div
        style={{
          // ensure a default min size for this widget
          minHeight: 100,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Keyframe preview */}
        <div style={{ flex: "0 0 auto", marginBottom: 12 }}>
          <img
            src="/path/to/your/keyframe.jpg"
            alt="Current keyframe"
            style={{
              width: "100%",
              borderRadius: 4,
              objectFit: "cover",
              maxHeight: 500,
            }}
          />
        </div>

        {/* Timeline bar */}
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            overflow: "hidden",
          }}
        >
          <input
            type="range"
            min={0}
            max={durationMs}
            value={timeMs}
            onChange={handleSlider}
            style={{ flexGrow: 1 }}
          />
          <span style={{ fontSize: 14, minWidth: 80, textAlign: "right" }}>
            {fmt(timeMs)}
          </span>
          <button
            type="button"
            onClick={handlePlus}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            aria-label="Upload new video"
          >
            <Plus size={24} weight="bold" />
          </button>
        </div>
      </div>
    </WidgetContainer>
  );
}