import Groq from "groq-sdk";


export async function getGuidance(prompt) {
 
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set in environment variables");
  }

 
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
