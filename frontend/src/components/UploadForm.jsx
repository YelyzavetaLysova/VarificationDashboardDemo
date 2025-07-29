import { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [provider, setProvider] = useState("default");
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("provider", provider);

    try {
      const res = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please check backend logs.");
    }
  };

  return (
    <div>
      <h2>Upload a File to Verification API</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="provider">Provider: </label>
          <select id="provider" value={provider} onChange={handleProviderChange}>
            <option value="default">Default</option>
            <option value="provider1">Provider 1</option>
            <option value="provider2">Provider 2</option>
          </select>
        </div>

        <button type="submit">Upload</button>
      </form>

      {response && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Server Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
