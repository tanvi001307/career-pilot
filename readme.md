

# Career Pilot 🚀

**Career Pilot** is an AI-powered full-stack application designed to assist students and job seekers in navigating their career paths. It provides tools for resume analysis, job searching, personalized career planning, and AI-driven mentorship.

## ✨ Features

* **📄 AI Resume Checker:** Upload your resume to get an instant "ATS Score", identify missing keywords, and receive improvement suggestions.
* **🤖 AI Career Guide:** A chat interface powered by **Groq AI (Llama 3)** to answer your career questions in real-time.
* **🗺️ Career Planner:** Generates step-by-step roadmaps (e.g., "Beginner to Internship") to help you achieve your goals.
* **💼 Job Opportunities:** A curated board of relevant job openings and internships.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, CSS
* **Backend:** Node.js, Express.js
* **AI Integration:** Groq SDK (Llama 3 model)
* **File Handling:** Multer (for resume parsing)

## 📂 Project Structure

```bash
career-pilot/
├── backend/         # Node.js & Express Server
│   ├── routes/      # API endpoints (jobs, resume, guide, planner)
│   ├── services/    # Logic for AI and data fetching
│   └── server.js    # Main entry point
├── frontend/        # React Application
│   ├── src/         # Components and Pages
│   └── public/      # Static assets
└── README.md

```

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### 1. Prerequisites

* Node.js installed on your machine.
* A **Groq API Key** (Get one for free at [console.groq.com](https://console.groq.com)).

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install

```

**Create a `.env` file** in the `backend` folder and add your API Key:

```env
PORT=5001
GROQ_API_KEY=your_actual_api_key_here

```

Start the server:

```bash
node server.js

```

*You should see: `Server running at: http://localhost:5001*`

### 3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install

```

Start the React app:

```bash
npm run dev

```

*Open the link provided (usually `http://localhost:5173`) to view the app.*

## 🔌 API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/jobs` | Fetches a list of available job opportunities. |
| **POST** | `/api/resume/check` | Uploads a resume file and returns an ATS score & feedback. |
| **POST** | `/api/guide` | Sends a prompt to Groq AI and returns career advice. |
| **POST** | `/api/planner` | Generates a step-by-step career plan based on user goals. |

## 🛡️ Usage Guide

1. **Resume Check:** Go to the "Resume Check" tab, upload a text or PDF file, and view your score.
2. **Opportunities:** Browses the "Opportunities" tab to see job listings.
3. **Planner:** Use the "Planner" tab to generate a roadmap (currently set to "Beginner to Internship").
4. **AI Guide:** Ask questions like *"How do I prepare for a Google interview?"* in the "AI Guide" tab.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for new features or bug fixes.



##This project is open-source 
