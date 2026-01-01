
export function analyzeResumeText(text) {
  if (!text || text.trim().length < 50) {
    return {
      score: 0,
      issues: ["Resume text is too short or unreadable"],
      suggestions: ["Upload a clear PDF resume with proper text content"]
    };
  }

  const lower = text.toLowerCase();

  const keywords = [
    "project",
    "intern",
    "experience",
    "skills",
    "education",
    "github",
    "linkedin"
  ];

  let score = 0;
  const missing = [];

  keywords.forEach(keyword => {
    if (lower.includes(keyword)) {
      score += 10;
    } else {
      missing.push(keyword);
    }
  });

  return {
    score,
    missingKeywords: missing,
    suggestions: [
      "Add missing sections clearly",
      "Use standard headings (Experience, Projects, Skills)",
      "Avoid images-only resumes (ATS cannot read them)"
    ]
  };
}
