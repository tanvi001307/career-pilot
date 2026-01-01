// import express from "express";
// import { fetchJobs } from "../services/jobFetcher.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const jobs = await fetchJobs();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch jobs" });
//   }
// });


// export default router;

import express from "express";
import { fetchJobs } from "../services/jobFetcher.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const jobs = await fetchJobs();
  res.json(jobs);
});

export default router;
