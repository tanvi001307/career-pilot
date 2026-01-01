import { useState } from "react";
// ✅ FIXED IMPORT: Uses "./api" because both files are in the same folder
import { getGuidance } from "../api"; 

export default function Guidance() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!prompt) return;
    
    setLoading(true);
    setResponse(""); // Clear previous answer
    
    try {
      // 1. Sends text to api.js -> server.js -> Groq AI
      const res = await getGuidance(prompt);
      
      // 2. Updates the UI with the answer
      setResponse(res.guidance);
    } catch (error) {
      setResponse("Error: Could not fetch guidance. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="section-title">AI Career Guide 🤖</h2>
      <div style={{ marginBottom: "1rem" }}>
        <textarea
          placeholder="Ask me anything (e.g., 'How do I become a backend engineer?')"
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      
      <button onClick={askAI} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
          <strong>Answer:</strong>
          <p style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>{response}</p>
        </div>
      )}
    </div>
  );
}