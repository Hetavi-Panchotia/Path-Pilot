# Adaptive AI Onboarding Engine

A clean, responsive, and beautiful AI-powered SaaS application that analyzes Resumes against Job Descriptions to generate a personalized learning roadmap.

## Structure
- `frontend/` - React (Vite) application with Tailwind CSS and Framer Motion.
- `backend/` - Node.js + Express API server handling AI processing and file uploads.

## Setup Instructions

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on `.env.example` and add your OpenAI API Key.
4. `npm run dev` to start the backend server.

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` to start the React application.

## Deployment
Use the included `Dockerfile` to build a production-ready image.
```
docker build -t adaptive-ai-onboarding .
docker run -p 5000:5000 --env-file .env adaptive-ai-onboarding
```