// src/components/WidgetContainer.jsx
import React from "react";

/**
 * A generic container for dashboard widgets.
 * Props:
 * - id: unique widget identifier, passed back to onRemove
 * - onRemove: function(id) called when the remove button is clicked
 * - children: the widget content to render inside
 *
 * Dragging is enabled only via the bottom handle (.widget-drag-handle).
 * The content area flexibly fills available space and auto-scrolls.
 */
export default function WidgetContainer({ id, onRemove, children }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",      // fill grid cell
        maxHeight: "100vh",  // never exceed viewport
        overflow: "hidden",  // clip outer overflow
      }}
    >
      {/* Remove button */}
      <button
        type="button"
        className="widget-remove-btn"
        onClick={() => onRemove(id)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onRemove(id)}
        tabIndex={0}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          lineHeight: 1,
          padding: 0,
          zIndex: 1,
        }}
        aria-label="Remove widget"
      >
        ×
      </button>

      {/* Widget content area: flexibly expands and scrolls if needed */}
      <div
        className="widget-content-cancel"
        style={{
          flex: "1 1 auto",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: 12,
          overflow: "auto",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>

      {/* Drag handle: only this bar can start widget dragging */}
      <div
        className="widget-drag-handle"
        style={{
          height: 24,
          background: "#f2f2f2",
          cursor: "move",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #ddd",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {/* drag bar indicator */}
      </div>
    </div>
  );
}
