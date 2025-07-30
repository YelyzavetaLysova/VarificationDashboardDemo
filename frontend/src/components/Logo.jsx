// src/components/Logo.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Logo component: shows Media Futures logo and text, links back to landing page
 */
export default function Logo() {
  return (
    <Link to="/" className="d-flex align-items-center text-decoration-none">
      <img src="/mediafutures-logo.png" height="32" alt="Media Futures" />
      <span className="ms-3 fs-4 fw-bold text-dark">Analytic Vision</span>
    </Link>
  );
}
