// src/components/SettingsMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

// Styles for menu items
const menuItemStyle = {
  width: "100%",
  padding: "8px 12px",
  background: "none",
  border: "none",
  textAlign: "left",
  fontSize: 14,
  color: "#333",
  cursor: "pointer",
};

/**
 * SettingsMenu: dropdown for workspace settings
 * Props:
 * - onLogout: callback for logout action
 */
export default function SettingsMenu({ onLogout }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          background: "none",
          border: "1px solid #dadada",
          borderRadius: 6,
          padding: "6px 12px",
          fontWeight: 500,
          fontSize: 15,
          color: "#222",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Settings <CaretDown size={16} weight="regular" style={{ marginLeft: 4 }} />
      </button>

      {/* Conditional dropdown menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1px solid #e2e7ef",
            borderRadius: 6,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginTop: 4,
            zIndex: 1000,
            minWidth: 160,
          }}
        >
          <button type="button" onClick={() => { navigate("/configure"); setOpen(false); }} style={menuItemStyle}>
            Configurations
          </button>
          <button type="button" onClick={() => { navigate("/account"); setOpen(false); }} style={menuItemStyle}>
            Account Settings
          </button>
          <div style={{ borderTop: "1px solid #e2e7ef" }} />
          <button type="button" onClick={() => { onLogout(); setOpen(false); }} style={menuItemStyle}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
