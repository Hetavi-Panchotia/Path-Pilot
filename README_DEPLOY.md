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

## Production Deployment

### 1. Build the Frontend
From the `frontend` directory:
```bash
npm run build
```
This generates the `dist` folder which the backend will serve.

### 2. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following:
```env
PORT=5005
```
*(Optionally set `NODE_ENV=production` if needed)*

### 3. Start the Server
From the `backend` directory:
```bash
npm start
```
The application will be available at `http://localhost:5005` (or whatever port you specified).

## Summary of Changes for Deployment
- **Unified Serving**: The backend now serves the frontend's `dist` folder using `express.static`.
- **Dynamic API URLs**: The frontend uses `VITE_API_URL` environment variable, defaulting to `/api`.
- **Port Management**: The backend uses the `PORT` environment variable.
- **Set Logic**: Skill comparison uses simple mathematical logic (no AI/OpenAI key required).
