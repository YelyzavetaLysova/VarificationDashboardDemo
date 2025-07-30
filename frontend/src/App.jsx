// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Page-level components
import LandingPage from './pages/LandingPage.jsx';
import UploadPage from './pages/UploadPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ChooseKeyframePage from "./pages/ChooseKeyframePage.jsx";
import WorkspacePage from "./pages/WorkspacePage.jsx";

// Utility pages (if needed)
import FormBasic from './components/FormBasic.jsx';
import FormWithMap from './components/FormWithMap.jsx';
import UploadForm from './components/UploadForm.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/select-keyframe" element={<ChooseKeyframePage />} />
        <Route path="/workspace" element={<WorkspacePage />} />

        {/* Protected / main app routes */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Utility routes */}
        <Route path="/form-basic" element={<FormBasic />} />
        <Route path="/form-map" element={<FormWithMap />} />
        <Route path="/upload-form" element={<UploadForm />} />

        {/* Fallback: redirect unknown paths back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
