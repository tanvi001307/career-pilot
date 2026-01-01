// import { useState } from "react";
// import { getPlanner } from "../api";
// import StepTimeline from "../components/StepTimeline";

// export default function Planner() {
//   const [steps, setSteps] = useState([]);

//   async function generatePlan() {
//     const res = await getPlanner({ level: "beginner", goal: "internship" });
//     setSteps(res.steps);
//   }

//   return (
//     <div>
//       <h2>Career Planner</h2>
//       <button onClick={generatePlan}>Generate Plan</button>
//       <StepTimeline steps={steps} />
//     </div>
//   );
// }

import { useState } from "react";
import { getPlanner } from "../api";
import "./Planner.css"; // Make sure to create this CSS file below!

export default function Planner() {
  // We now capture detailed user context
  const [formData, setFormData] = useState({
    level: "Beginner",
    goal: "Frontend Intern",
    skills: "",
    timeline: "3 months"
  });

  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handles typing in the input boxes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function generatePlan() {
    setLoading(true);
    setRoadmap([]); // Clear previous results
    setError("");

    try {
      // Sends { level, goal, skills, timeline } to the backend
      const res = await getPlanner(formData);
      
      // The backend should now return an object with a "roadmap" array
      if (res.roadmap) {
        setRoadmap(res.roadmap);
      } else if (res.steps) {
        // Fallback if backend is still sending simple steps
        setRoadmap(res.steps.map(s => ({ week: "Step", topic: s, action_items: [], resources: "" })));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Ensure Backend is running and 'Groq' key is set.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="planner-container">
      <h2 className="section-title">Career Roadmap Generator 🗺️</h2>
      
      {/* 1. The Input Form */}
      <div className="planner-form card">
        <div className="form-group">
          <label>Current Level</label>
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="Beginner">Beginner (Student)</option>
            <option value="Intermediate">Intermediate (Built some projects)</option>
            <option value="Advanced">Advanced (Job Ready)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Target Role</label>
          <input 
            name="goal" 
            value={formData.goal} 
            onChange={handleChange} 
            placeholder="e.g. Google SDE Intern"
          />
        </div>

        <div className="form-group">
          <label>Current Skills</label>
          <input 
            name="skills" 
            value={formData.skills} 
            onChange={handleChange} 
            placeholder="e.g. Python, basic HTML" 
          />
        </div>

        <div className="form-group">
          <label>Timeline</label>
          <select name="timeline" value={formData.timeline} onChange={handleChange}>
            <option value="1 month">1 month (Crash Course)</option>
            <option value="3 months">3 months (Standard)</option>
            <option value="6 months">6 months (Deep Dive)</option>
          </select>
        </div>

        <button onClick={generatePlan} disabled={loading} className="generate-btn">
          {loading ? "Generating Custom Plan..." : "Create My Roadmap"}
        </button>
        
        {error && <p className="error-msg">{error}</p>}
      </div>

      {/* 2. The Results Display */}
      <div className="roadmap-list">
        {roadmap.map((step, index) => (
          <div key={index} className="roadmap-card">
            <div className="step-time">{step.week || `Step ${index + 1}`}</div>
            <h3 className="step-title">{step.topic}</h3>
            
            {/* Handle action items if they exist */}
            {step.action_items && step.action_items.length > 0 && (
              <ul className="step-actions">
                {step.action_items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}

            {/* Handle resources if they exist */}
            {step.resources && (
              <div className="step-res">
                <strong>Recommended Resource:</strong> {step.resources}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
