
import express from "express";
import { getGuidance } from "../services/llmService.js";
import Plan from "../models/Plan.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
  const { goal, level, skills, timeline } = req.body;

  try {
    // Logic to decide unit
    let timeUnit = "Weeks";
    if (timeline.includes("6 months") || timeline.includes("Year")) {
      timeUnit = "Months";
    }

    const prompt = `
      Act as a Senior Career Coach.
      USER CONTEXT:
      - Goal: ${goal}
      - Current Level: ${level}
      - Existing Skills: ${skills || "None"}
      - TIMELINE: ${timeline}

      INSTRUCTIONS:
      1. Group steps by **${timeUnit}**.
      2. Return strictly valid JSON.
      3. No Markdown, no bold text (**), no introductory text.

      OUTPUT FORMAT:
      {
        "roadmap": [
          {
            "week": "Time Unit 1",
            "topic": "Focus Area",
            "action_items": ["Task 1", "Task 2"],
            "resources": "Resource name"
          }
        ]
      }
    `;

    const aiResponse = await getGuidance(prompt);
    
    // 🛡️ CRASH PROOF CLEANING LOGIC 🛡️
    // 1. Find the first '{' and the last '}'
    const startIndex = aiResponse.indexOf('{');
    const endIndex = aiResponse.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("AI did not return a valid JSON object");
    }

    // 2. Extract exactly the JSON part, ignoring text before/after
    const cleanJson = aiResponse.substring(startIndex, endIndex + 1);

    // 3. Parse it
    const data = JSON.parse(cleanJson);

    // Save to DB
    const newPlan = new Plan({
      role: level,
      goal: goal,
      steps: data.roadmap.map(s => s.topic) 
    });
    await newPlan.save();

    res.json(data);

  } catch (err) {
    console.error("AI Error:", err.message);
    // console.log("Failed Response was:", aiResponse); // Uncomment to debug if needed
    res.status(500).json({ error: "Failed to generate plan. Please try again." });
  }
});

export default router;