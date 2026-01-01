// export async function fetchJobs() {
//   return [
//     {
//       id: 1,
//       role: "Software Engineering Intern",
//       company: "Google",
//       location: "India",
//       link: "https://careers.google.com",
//     },
//     {
//       id: 2,
//       role: "Frontend Intern",
//       company: "Flipkart",
//       location: "Bangalore",
//       link: "https://www.flipkartcareers.com",
//     },
//   ];
// }
import fetch from "node-fetch";

const REMOTIVE_API = "https://remotive.com/api/remote-jobs";

const STUDENT_KEYWORDS = [
  "intern",
  "junior",
  "graduate",
  "trainee",
  "entry",
  "associate",
  "apprentice"
];

export async function fetchJobs() {
  try {
    const response = await fetch(REMOTIVE_API);
    const data = await response.json();

    if (!data.jobs || data.jobs.length === 0) {
      console.error("No jobs received from Remotive");
      return [];
    }

    // Rank jobs instead of hard filtering
    const rankedJobs = data.jobs.map(job => {
      const title = job.title.toLowerCase();
      const score = STUDENT_KEYWORDS.reduce(
        (acc, word) => acc + (title.includes(word) ? 1 : 0),
        0
      );

      return { job, score };
    });

    // Sort by relevance score
    rankedJobs.sort((a, b) => b.score - a.score);

    // Take top results (even if score = 0)
    const finalJobs = rankedJobs.slice(0, 15).map(({ job }) => ({
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      type: job.job_type,
      url: job.url,
      tags: job.tags || []
    }));

    console.log(`Fetched ${finalJobs.length} jobs`);

    return finalJobs;

  } catch (error) {
    console.error("Job fetch error:", error);
    return [];
  }
}
