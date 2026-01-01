import { useState } from "react";
import { checkResume } from "../api";

export default function ResumeUploader() {
  const [result, setResult] = useState(null);

  async function handleUpload(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("resume", file);

    const res = await checkResume(formData);
    setResult(res);
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {result && (
        <pre style={{ background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
