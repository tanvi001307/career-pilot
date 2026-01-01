import { useEffect, useState } from "react";
import { fetchJobs } from "../api";
import JobCard from "../components/JobCard";

export default function Opportunities() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  return (
  <div className="card">
    <h2 className="section-title">Opportunities</h2>
    <div className="jobs-grid">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  </div>
);}