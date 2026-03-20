# Multi-stage Dockerfile for Adaptive AI Onboarding Engine

# ---- Frontend Build ----
FROM node:18-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# ---- Backend Build ----
FROM node:18-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend ./

# Copy compiled frontend app to public directory of backend
# This allows the Express server to serve the frontend UI
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 5000
CMD ["node", "server.js"]
