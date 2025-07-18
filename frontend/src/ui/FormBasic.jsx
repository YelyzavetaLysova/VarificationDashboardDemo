import React from 'react'; 
import { useState } from "react";
import { sendVerification } from "../api";

function FormBasic() {
  const [form, setForm] = useState({
    location_input: "",
    timestamp_input: "",
    identity: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await sendVerification(form);
    setResult(res);
  } catch (err) {
    console.error("Request failed:", err);
    alert("Verification failed. Is the backend running?");
  }
};

  return (
    <div>
      <h2>Verification Form (Basic)</h2>
      <form onSubmit={handleSubmit}>
        <input name="location_input" onChange={handleChange} placeholder="Location input" />
        <input name="timestamp_input" onChange={handleChange} placeholder="Timestamp input" />
        <input name="identity" onChange={handleChange} placeholder="Identity" />
        <button type="submit">Verify</button>
      </form>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default FormBasic;
