

import express from "express";
import { fetchJobs } from "../services/jobFetcher.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const jobs = await fetchJobs();
  res.json(jobs);
});

export default router;
