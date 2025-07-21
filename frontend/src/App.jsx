import React, { useState } from 'react';
import FormBasic from './ui/FormBasic.jsx';
import FormWithMap from './ui/FormWithMap.jsx';
import UploadForm from './ui/UploadForm.jsx';
import './style.css';

function App() {
  const [uiType, setUiType] = useState("basic");

  return (
    <div className="app">
      <h1>Verification UI Demo</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="ui-select">Select UI type: </label>
        <select
          id="ui-select"
          value={uiType}
          onChange={(e) => setUiType(e.target.value)}
        >
          <option value="basic">Basic Form</option>
          <option value="map">Form with Map</option>
          <option value="upload">File Upload</option>
        </select>
      </div>

      {uiType === "basic" && <FormBasic />}
      {uiType === "map" && <FormWithMap />}
      {uiType === "upload" && <UploadForm />}
    </div>
  );
}

export default App;
