
export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-title">{job.role}</div>
      <div className="job-meta">
        {job.company} • {job.location}
      </div>
      <a
        className="job-link"
        href={job.link}
        target="_blank"
        rel="noreferrer"
      >
        View details
      </a>
    </div>
  );
}

