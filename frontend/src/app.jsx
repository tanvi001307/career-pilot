import { useState } from "react";
import "./App.css";

// Assuming these files are in the same folder as App.jsx. 
// If they are in a 'components' folder, change path to "./components/ResumeCheck" etc.
import ResumeCheck from "./pages/ResumeCheck"; 
import Opportunities from "./pages/Opportunities"; 
import Planner from "./pages/Planner";
import Guidance from "./pages/Guidance";

function App() {
  const [activeTab, setActiveTab] = useState("resume");

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="app-title">Career Pilot 🚀</div>
          <div className="app-subtitle">Your AI Career Assistant</div>
        </div>

        <div className="app-tabs">
          <button 
            className={`app-tab ${activeTab === "resume" ? "active" : ""}`}
            onClick={() => setActiveTab("resume")}
          >
            Resume Check
          </button>
          <button 
            className={`app-tab ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
          >
            Opportunities
          </button>
          <button 
            className={`app-tab ${activeTab === "planner" ? "active" : ""}`}
            onClick={() => setActiveTab("planner")}
          >
            Planner
          </button>
          <button 
            className={`app-tab ${activeTab === "guide" ? "active" : ""}`}
            onClick={() => setActiveTab("guide")}
          >
            AI Guide
          </button>
        </div>
      </header>

      <main>
        {activeTab === "resume" && <ResumeCheck />}
        {activeTab === "jobs" && <Opportunities />}
        {activeTab === "planner" && <Planner />}
        {activeTab === "guide" && <Guidance />}
      </main>
    </div>
  );
}

export default App;