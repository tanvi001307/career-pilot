

import 'dotenv/config';
console.log("GROQ KEY LOADED:", !!process.env.GROQ_API_KEY);


import express from "express";
import cors from "cors";
import mongoose from "mongoose"; 

import resumeRoutes from "./routes/resume.js";
import jobRoutes from "./routes/jobs.js";
import plannerRoutes from "./routes/planner.js";
import guideRoutes from "./routes/guide.js";

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/guide", guideRoutes);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('✅ Career Pilot Backend is Running!');
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
