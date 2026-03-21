# Path-Pilot Deployment Guide

This project is now ready for deployment. The backend serves the frontend static files, and all configurations are managed via environment variables.

## Local Development

1.  **Frontend**:
    - `cd frontend`
    - `npm install`
    - `npm run dev` (Runs on `http://localhost:5173`)
2.  **Backend**:
    - `cd backend`
    - `npm install`
    - `npm run dev` (Runs on `http://localhost:5005`)

## Production Deployment (e.g., Render)

This project has been set up with a root `package.json` to orchestrate build and deployment in a single environment.

### 1. Build the Application
On your deployment platform (Render, etc.), use the following build command:
```bash
npm run build
```
This command will:
- Install frontend dependencies.
- Build the frontend (`dist` folder).
- Install backend dependencies.

### 2. Start the Server
Set your start command to:
```bash
npm start
```
The backend will automatically find the `dist` folder and serve the frontend UI.

### 3. Environment Variables
Ensure the following variables are set on your deployment platforms:

**On Render (Backend):**
- `PORT`: `10000` (Render's default) or any port you prefer.

**On Vercel (Frontend):**
- `VITE_API_URL`: Your full Render backend URL followed by `/api` (e.g., `https://path-pilot-7p4c.onrender.com/api`).
  - *Note: Don't forget the `/api` at the end!*

## Summary of Robustness Changes
- **Root Orchestration**: `package.json` at the root handles unified installs and builds for both frontend and backend.
- **Robust Pathing**: `server.js` now searches for the `dist` folder relatively, which adapts to different deployment structures.
- **Improved API Logic**: The frontend now automatically handles trailing slashes and provides better error messages if the backend is unreachable.


