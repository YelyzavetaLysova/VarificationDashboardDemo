// src/pages/WorkspacePage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { CaretDown, List } from "@phosphor-icons/react";
import { Responsive, WidthProvider } from "react-grid-layout";

import WidgetMenu from "../components/WidgetMenu.jsx";
import WidgetContainer from "../components/WidgetContainer.jsx";
import VideoTimelineWidget from "../components/VideoTimelineWidget.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function WorkspacePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [widgets, setWidgets] = useState([
    { i: "video-timeline", x: 2, y: Infinity, w: 8, h: 6, type: "video-timeline" },
  ]);

  const DEFAULT_W = 4;
  const DEFAULT_H = 4;

  const handleAddWidget = (type) => {
    const id = Date.now().toString();
    setWidgets((prev) => [
      ...prev,
      { i: id, x: (prev.length * 2) % 12, y: Infinity, w: DEFAULT_W, h: DEFAULT_H, type },
    ]);
    setMenuOpen(false);
  };

  const handleRemove = (id) => setWidgets((prev) => prev.filter((w) => w.i !== id));

  const onLayoutChange = (layout) => {
    setWidgets((prev) =>
      prev.map((w) => {
        const lm = layout.find((l) => l.i === w.i);
        return lm ? { ...w, x: lm.x, y: lm.y, w: lm.w, h: lm.h } : w;
      })
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc", position: "relative" }}>
      {/* Navbar */}
      <div
        style={{
          borderBottom: "1px solid #f2f2f2",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px 0 12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            style={{ background: "none", border: "none", padding: "8px 8px 8px 2px", marginRight: 8, cursor: "pointer" }}
            aria-label="Open widget menu"
          >
            <List size={32} color="#222" weight="regular" />
          </button>
          <img src="/mediafutures-logo.png" height="28" alt="Media Futures" style={{ marginRight: 16 }} />
          <span style={{ fontWeight: 700, fontSize: 24, color: "#222" }}>Analytic Vision Dashboard</span>
        </div>
        <button
          className="btn btn-outline-light"
          style={{ border: "1px solid #dadada", borderRadius: 6, fontWeight: 500, fontSize: 15, color: "#222" }}
        >
          Choose configuration <CaretDown size={20} weight="regular" />
        </button>
      </div>

      {/* WidgetMenu popover */}
      {menuOpen && <WidgetMenu onAddWidget={handleAddWidget} onClose={() => setMenuOpen(false)} />}

      {/* Draggable/resizable widget canvas */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: widgets }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={true}
        compactType="vertical"
        preventCollision={false}
        draggableHandle=".widget-drag-handle"
        style={{ padding: 16 }}
      >
        {widgets.map(({ i, type, x, y, w, h }) => (
          <div key={i} data-grid={{ i, x, y, w, h }}>
            {type === "video-timeline" ? (
              <VideoTimelineWidget id={i} onRemove={handleRemove} />
            ) : (
              <WidgetContainer id={i} onRemove={handleRemove}>
                <strong>{type}</strong>
              </WidgetContainer>
            )}
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Footer nav bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#f8fafd",
          borderTop: "1px solid #e2e7ef",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 52,
          zIndex: 99,
        }}
      >
        <div style={{ display: "flex", gap: 0, width: 440 }}>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>
            View 1
          </button>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>
            View 2
          </button>
          <button className="btn btn-link px-4 py-2" style={{ color: "#222", fontWeight: 500, borderRadius: 0 }}>
            View 3
          </button>
          <button
            className="btn btn-light px-4 py-2"
            style={{
              color: "#6e7687",
              fontWeight: 500,
              borderRadius: 8,
              marginLeft: 16,
              border: "1px solid #e2e7ef",
              background: "#f2f5fb",
            }}
          >
            New View
          </button>
        </div>
      </div>
    </div>
  );
}
