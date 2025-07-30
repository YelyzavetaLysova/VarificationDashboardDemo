// src/pages/WorkspacePage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { List } from "@phosphor-icons/react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useNavigate } from "react-router-dom";

import WidgetMenu from "../components/WidgetMenu.jsx";
import WidgetContainer from "../components/WidgetContainer.jsx";
import VideoTimelineWidget from "../components/VideoTimelineWidget.jsx";
import SettingsMenu from "../components/SettingsMenu.jsx";
import Logo from "../components/Logo.jsx";
import BottomNav from "../components/BottomNav.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function WorkspacePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [widgets, setWidgets] = useState([
    // Default video-timeline widget centered bottom, medium size
    { i: "video-timeline", x: 3, y: Infinity, w: 6, h: 6, type: "video-timeline" },
  ]);

  const DEFAULT_W = 4;
  const DEFAULT_H = 4;

  /**
   * Adds a widget of the given type.
   */
  const handleAddWidget = (type) => {
    const id = Date.now().toString();
    setWidgets((prev) => [
      ...prev,
      { i: id, x: (prev.length * 2) % 12, y: Infinity, w: DEFAULT_W, h: DEFAULT_H, type },
    ]);
    setMenuOpen(false);
  };

  /**
   * Removes widget by id.
   */
  const handleRemove = (id) => setWidgets((prev) => prev.filter((w) => w.i !== id));

  /**
   * Sync layout changes back into state.
   */
  const onLayoutChange = (layout) => {
    setWidgets((prev) =>
      prev.map((w) => {
        const lm = layout.find((l) => l.i === w.i);
        return lm ? { ...w, x: lm.x, y: lm.y, w: lm.w, h: lm.h } : w;
      })
    );
  };

  /**
   * Clears auth and redirects to login.
   */
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
          padding: "0 28px",
        }}
      >
        {/* Left: widget menu toggle + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}
            aria-label="Open widget menu"
          >
            <List size={32} color="#222" weight="regular" />
          </button>
          <Logo />
        </div>

        {/* Right: Settings dropdown */}
        <SettingsMenu onLogout={handleLogout} />
      </div>

      {/* WidgetMenu popover */}
      {menuOpen && <WidgetMenu onAddWidget={handleAddWidget} onClose={() => setMenuOpen(false)} />}

      {/* Grid canvas */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: widgets }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        useCSSTransforms={true}
        compactType="vertical"
        preventCollision={false}
        draggableHandle=".widget-drag-handle"
        margin={[16, 16]}
        containerPadding={[16, 16]}
        style={{ paddingBottom: 64 }}
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

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
