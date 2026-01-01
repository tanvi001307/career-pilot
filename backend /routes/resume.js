import express from "express";
import multer from "multer";
import PDFParser from "pdf2json";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const parsePDF = (buffer) => {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser(this, 1); // 1 = Text content only

    parser.on("pdfParser_dataError", (errData) => reject(errData.parserError));

    parser.on("pdfParser_dataReady", (pdfData) => {
      try {
        const textArray = [];
        
        // Loop through every page and every text block
        pdfData.Pages.forEach(page => {
          page.Texts.forEach(textObj => {
            textObj.R.forEach(run => {
              try {
                // Try to decode (fixes %20 for spaces, etc.)
                const decoded = decodeURIComponent(run.T);
                textArray.push(decoded);
              } catch (decodeErr) {
                // FIX: If decoding fails, KEEP the raw text! 
                // (Don't just delete it, or we lose data)
                textArray.push(run.T); 
              }
            });
          });
        });

        // Join words with spaces
        resolve(textArray.join(" "));

      } catch (err) {
        reject(new Error("Failed to parse PDF structure: " + err.message));
      }
    });

    parser.parseBuffer(buffer);
  });
};

router.post("/check", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    // 1. Extract Text
    const rawText = await parsePDF(req.file.buffer);
    
    // 2. Clean Text (Remove extra spaces and URL encoded artifacts)
    const cleanText = rawText
      .replace(/%20/g, " ") // explicit space fix
      .replace(/\s+/g, " ")
      .trim();

    // --- DEBUG: Print what the server actually sees ---
    console.log("--- RESUME DEBUG START ---");
    console.log("Extracted Length:", cleanText.length);
    console.log("First 100 chars:", cleanText.substring(0, 100));
    console.log("--- RESUME DEBUG END ---");

    if (!cleanText || cleanText.length < 50) {
      return res.status(400).json({ error: "Resume text extracted is too short or empty." });
    }

    // 3. UPDATED KEYWORDS (Includes C++, Flutter, Python, etc.)
    const keywords = [
      // Web / General
      "javascript", "react", "node", "html", "css", "api", "git",
      // Data / Backend
      "python", "sql", "java", "c++", "c", "aws", "docker",
      // Mobile / Blockchain (Specific to your resume)
      "flutter", "dart", "solidity", "firebase"
    ];

    const lower = cleanText.toLowerCase();

    // Check for matches
    const matched = keywords.filter(k => {
      // Use regex to match whole words (avoids "java" matching "javascript")
      // We escape C++ specifically because '+' is a regex character
      const escapedKey = k === "c++" ? "c\\+\\+" : k;
      const regex = new RegExp(`\\b${escapedKey}`, "i");
      
      // Fallback: If regex fails, use simple includes
      return regex.test(lower) || lower.includes(k);
    });

    const score = Math.round((matched.length / keywords.length) * 100);

    res.json({
      atsScore: score,
      matchedKeywords: matched,
      missingKeywords: keywords.filter(k => !matched.includes(k)),
      resumeLength: cleanText.length
    });

  } catch (error) {
    console.error("Processing Error:", error);
    res.status(500).json({ 
      error: "Resume processing failed", 
      details: error.message 
    });
  }
});

export default router;