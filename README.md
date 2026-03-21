# 🚀 PathPilot AI

### Adaptive Skill Gap Analyzer & Learning Roadmap Generator

---

## 📌 Overview

**PathPilot AI** is a modern AI-powered web application that analyzes a user's **skills (via resume text)** against a **target job description** and generates a **personalized learning roadmap**.

Unlike traditional onboarding systems, PathPilot uses a **text-based input approach** (no file uploads or OCR) to ensure **speed, reliability, and accuracy**.

---

## ✨ Features

* 📝 Paste Resume (text input)
* 📄 Paste Job Description
* 🧠 AI-powered **skill extraction**
* ⚖️ Accurate **Skill Gap Analysis**

  * Matched Skills ✅
  * Missing Skills ❌
  * Weak Skills ⚠️
* 📊 **Job Readiness Score (%)**
* 📈 Animated **Progress Bar**
* 🗺️ Personalized **Learning Roadmap**
* 🎨 Modern UI with animations & dark mode
* ⚡ Fast performance (no OCR delays)

---

## 🧠 How It Works (Skill Gap Logic)

### 1. Input

* User pastes:

  * Resume content
  * Job Description

---

### 2. Skill Extraction

* AI extracts:

  * Skills
  * Tools
  * Technologies

---

### 3. Skill Normalization

To ensure accurate comparison:

* Convert to lowercase
* Remove special characters
* Trim whitespace

Example:

* "Node.js" → "nodejs"
* "React JS" → "reactjs"

---

### 4. Skill Gap Analysis

The system compares:

* Resume Skills vs Job Description Skills

Outputs:

* ✅ Matched Skills → present in both
* ❌ Missing Skills → required but not present
* ⚠️ Weak Skills → optional enhancement

---

### 5. Readiness Score Calculation

```bash
readinessScore = (matchedSkills / totalJDskills) * 100
```

* Rounded to nearest integer
* Safe handling for edge cases

---

### 6. Roadmap Generation

AI generates:

* Step-by-step learning plan
* Estimated duration
* Resources (docs, tutorials)
* Mini project suggestions

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Chart.js / Recharts

### Backend

* Node.js
* Express.js

### AI Integration

* OpenAI API

---

## 📁 Project Structure

```
root/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   │   └── aiService.js
│   │
│   ├── utils/
│   │   ├── skillNormalizer.js
│   │   └── parser.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
├── Dockerfile
└── .env.example
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/pathpilot-ai.git
cd pathpilot-ai
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
OPENAI_API_KEY=your_api_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 4. Open App

```
https://path-pilot-cyan.vercel.app/
```

---

## 🔐 Environment Variables

```
VITE_API_URL=https://path-pilot-7p4c.onrender.com/api
PORT=5000
```

---

## 🚀 Deployment

### Frontend

* Vercel

### Backend

* Render / Railway

---

## 🚫 .gitignore

```
node_modules/
.env
dist/
build/
*.log
.DS_Store
```

---

## 💡 Key Improvements (Updated Version)

* ❌ Removed OCR & file uploads
* ✅ Switched to **text-based input**
* ⚡ Faster and more reliable processing
* 🧠 Improved skill matching logic
* 📊 Accurate readiness scoring

---

## 🔮 Future Enhancements

* 📄 Export roadmap as PDF
* 📊 Advanced analytics dashboard
* 🧪 Skill quizzes
* 💾 Save user history

---

## 👩‍💻 Authors

* Hetavi Panchotia
* Priya
* Nandiniben Prajapati
* Dhruvi Patel

---

## 🎯 One-Line Pitch

> PathPilot AI analyzes your current skills and intelligently guides you with a personalized roadmap to become job-ready faster.

---
