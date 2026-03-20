# 🚀 PathPilot AI

### Adaptive AI Onboarding & Skill Gap Analyzer

---

## 📌 Overview

**PathPilot AI** is an AI-powered onboarding engine that analyzes a candidate’s **Resume** against a **Job Description** to identify skill gaps and generate a **personalized learning roadmap**.

It replaces traditional one-size-fits-all onboarding with a **dynamic, adaptive learning experience**, helping users become job-ready faster.

---

## ✨ Features

* 📂 Upload Resume (**PDF / Image**)
* 📝 Input Job Description (text or file)
* 🧠 AI-powered **skill extraction & normalization**
* ⚖️ **Skill Gap Analysis**

  * Matched Skills ✅
  * Missing Skills ❌
  * Weak Skills ⚠️
* 📊 **Job Readiness Score (%)**
* 🗺️ Personalized **Learning Roadmap**
* 📈 **Progress Tracking System**

  * Step completion
  * Dynamic progress bar
* 🤖 AI Chat Assistant (context-aware)
* 🎨 Modern UI with animations & dark/light mode

---

## 🧠 How It Works (Skill Gap Logic)

1. **Document Parsing**

   * Resume (PDF/Image) → text extraction
   * OCR used for image processing

2. **Skill Extraction**

   * AI extracts:

     * Skills
     * Tools
     * Experience level

3. **Job Description Analysis**

   * Required skills and priorities identified

4. **Skill Gap Analysis**

   * Compare:

     * Resume Skills vs JD Skills
   * Output:

     * Matched Skills
     * Missing Skills
     * Weak Skills

5. **Readiness Score**

   * Calculated based on overlap and skill weightage

6. **Roadmap Generation**

   * AI generates:

     * Step-by-step learning path
     * Time estimates
     * Resources & projects

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
* Multer (file uploads)

### AI & Processing

* OpenAI API
* Tesseract.js (OCR for images)
* pdf-parse (PDF text extraction)

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
│   │   ├── aiService.js
│   │   ├── ocrService.js
│   │
│   ├── utils/
│   │   ├── pdfParser.js
│   │   └── textCleaner.js
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

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pathpilot-ai.git
cd pathpilot-ai
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
OPENAI_API_KEY=your_api_key_here
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🐳 Docker (Optional)

```bash
docker build -t pathpilot-ai .
docker run -p 5000:5000 pathpilot-ai
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
OPENAI_API_KEY=your_api_key
PORT=5000
```

---

## 🚀 Deployment

### Frontend

* Deploy on **Vercel**

### Backend

* Deploy on **Render / Railway**

---

## 🚫 .gitignore

```
node_modules/
.env
dist/
build/
uploads/
*.log
.DS_Store
```

---

## 💡 Future Enhancements

* 📄 Export roadmap as PDF
* 📊 Advanced analytics dashboard
* 👥 Team onboarding support
* 🧪 Skill assessment quizzes
* ☁️ Cloud storage integration

---

## 👩‍💻 Authors

* **Hetavi Panchotia**
* **Kreya Panchal**

---

## 🎯 One-Line Pitch

> PathPilot AI intelligently maps your current skills to your dream role and generates a personalized roadmap to get you there faster.

---
