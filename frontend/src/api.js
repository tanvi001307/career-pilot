
const BASE_URL = "http://localhost:5001/api";

export async function checkResume(formData) {
  const res = await fetch(`${BASE_URL}/resume/check`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function fetchJobs() {
  const res = await fetch(`${BASE_URL}/jobs`);
  return res.json();
}

export async function getGuidance(prompt) {
  const res = await fetch(`${BASE_URL}/guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  return res.json();
}

export async function getPlanner(data) {
  const res = await fetch(`${BASE_URL}/planner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
