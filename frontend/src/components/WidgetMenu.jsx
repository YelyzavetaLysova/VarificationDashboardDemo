"use client";
import React, { useState } from "react";
import {
  Globe,
  ChartBar,
  Sun,
  TextT,
  Scan,
} from "@phosphor-icons/react";

const widgets = [
  { key: "geolocation", icon: <Globe size={28} />, label: "Geolocation", desc: "Get more info about position", type: "Map" },
  { key: "metadata", icon: <ChartBar size={28} />, label: "Metadata", desc: "Get metadata", type: "Text" },
  { key: "solar", icon: <Sun size={28} />, label: "Solar Data", desc: "Get more info about solar data", type: "Map" },
  { key: "transcription", icon: <TextT size={28} />, label: "Transcription", desc: "Get more info about text", type: "Text" },
  { key: "objects", icon: <Scan size={28} />, label: "Objects Detection", desc: "Get more info about objects", type: "Map" },
];

const types = ["All", "Text", "Map"];

export default function WidgetMenu({ onAddWidget, onClose }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filtered = widgets.filter(
    (w) =>
      (selectedType === "All" || w.type === selectedType) &&
      (w.label.toLowerCase().includes(search.toLowerCase()) ||
        w.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 16,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 24px #0001",
        width: 280,
        zIndex: 99,
        padding: 20,
      }}
    >
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          border: "1.2px solid #e2e7ef",
          borderRadius: 7,
          marginBottom: 12,
          padding: "6px 10px",
          fontSize: 16,
        }}
      />
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              fontWeight: 500,
              fontSize: 14,
              border: "none",
              padding: "6px 14px",
              background: selectedType === type ? "#e2e7ef" : "#fafbfc",
              color: "#333",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div style={{ fontWeight: 600, color: "#686" }}>Suggested</div>
      <div>
        {filtered.map((w) => (
          <div
            key={w.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: "1px solid #f2f2f2",
              cursor: "pointer",
            }}
            onClick={() => onAddWidget(w.key)}
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onAddWidget(w.key)
            }
          >
            <span>{w.icon}</span>
            <span>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{w.label}</div>
              <div style={{ color: "#888", fontSize: 13 }}>{w.desc}</div>
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              color: "#aaa",
              padding: "18px 0",
              textAlign: "center",
            }}
          >
            No widgets found
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 8,
          right: 10,
          border: "none",
          background: "none",
          fontSize: 18,
          color: "#888",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
