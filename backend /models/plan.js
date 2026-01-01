import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  role: String,       
  goal: String,       
  steps: [String],   
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Plan", PlanSchema);
