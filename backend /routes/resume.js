import express from "express";
import multer from "multer";
import PDFParser from "pdf2json";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const parsePDF = (buffer) => {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser(this, 1); 

    parser.on("pdfParser_dataError", (errData) => reject(errData.parserError));

    parser.on("pdfParser_dataReady", (pdfData) => {
      try {
        const textArray = [];
        
        // Loop through every page and every text block
        pdfData.Pages.forEach(page => {
          page.Texts.forEach(textObj => {
            textObj.R.forEach(run => {
              try {
                
                const decoded = decodeURIComponent(run.T);
                textArray.push(decoded);
              } catch (decodeErr) {
                
                textArray.push(run.T); 
              }
            });
          });
        });

       
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

   
    const rawText = await parsePDF(req.file.buffer);
    
    
    const cleanText = rawText
      .replace(/%20/g, " ") 
      .replace(/\s+/g, " ")
      .trim();

    
    console.log("--- RESUME DEBUG START ---");
    console.log("Extracted Length:", cleanText.length);
    console.log("First 100 chars:", cleanText.substring(0, 100));
    console.log("--- RESUME DEBUG END ---");

    if (!cleanText || cleanText.length < 50) {
      return res.status(400).json({ error: "Resume text extracted is too short or empty." });
    }

    
    const keywords = [
      
      "javascript", "react", "node", "html", "css", "api", "git",
      
      "python", "sql", "java", "c++", "c", "aws", "docker",
     
      "flutter", "dart", "solidity", "firebase"
    ];

    const lower = cleanText.toLowerCase();

    
    const matched = keywords.filter(k => {
     
      const escapedKey = k === "c++" ? "c\\+\\+" : k;
      const regex = new RegExp(`\\b${escapedKey}`, "i");
      

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
