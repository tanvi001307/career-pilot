import Groq from "groq-sdk";

// Remove the top-level check/init to prevent startup crashes

export async function getGuidance(prompt) {
  // 1. Check Key at Runtime (when function is called)
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set in environment variables");
  }

  // 2. Initialize Client
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // 3. Make Request
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}