import React from 'react'; 
import { useState } from "react";
import { sendVerification } from "../api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FormWithMap() {
  const [form, setForm] = useState({
    location_input: "",
    timestamp_input: "",
    identity: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    try {
      const res = await sendVerification(form);
      setResult(res);
    } catch (err) {
      console.error("Request failed:", err);
      setError("Verification failed. Is the backend running?");
    }
  };

  const coords = result?.geo?.geometry?.coordinates || [];

  return (
    <div>
      <h2>Verification Form (with Map)</h2>
      <form onSubmit={handleSubmit}>
        <input name="location_input" onChange={handleChange} placeholder="Location input" />
        <input name="timestamp_input" onChange={handleChange} placeholder="Timestamp input" />
        <input name="identity" onChange={handleChange} placeholder="Identity" />
        <button type="submit">Verify</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1]) && (
            <MapContainer
              center={[coords[1], coords[0]]}
              zoom={4}
              style={{ height: "300px", marginTop: "1em" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[coords[1], coords[0]]}>
                <Popup>Geo Location</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      )}
    </div>
  );
}

export default FormWithMap;
