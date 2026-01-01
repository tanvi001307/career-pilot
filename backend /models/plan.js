import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  role: String,       // e.g., "Software Engineer"
  goal: String,       // e.g., "Internship"
  steps: [String],    // The list of 5 steps
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Plan", PlanSchema);