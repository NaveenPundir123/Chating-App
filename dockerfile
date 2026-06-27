# Monolith: Vite frontend + Express API. Build from repo root.

# --- Stage 1: build the SPA (Vite) ---
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY ["frontend/Chatting App/package.json", "frontend/Chatting App/package-lock.json", "./"]
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY ["frontend/Chatting App/", "./"]
ENV VITE_CLERK_PUBLISHABLE_KEY=pk_test_bWFqb3ItbWF5Zmx5LTk5LmNsZXJrLmFjY291bnRzLmRldiQ
RUN npm run build

# --- Stage 2: install backend dependencies ---
FROM node:22-bookworm-slim AS backend-build
WORKDIR /app/backend
COPY ["backend/package.json", "backend/package-lock.json", "./"]
RUN npm install --no-audit --no-fund
COPY ["backend/", "./"]
RUN npm run build

# --- Stage 3: runtime image ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY ["backend/package.json", "backend/package-lock.json", "./backend/"]
RUN cd backend && npm install --omit=dev --no-audit --no-fund && npm cache clean --force
COPY ["backend/", "./backend/"]
COPY --from=frontend-build /app/frontend/dist ./backend/public

EXPOSE 3000
CMD ["node", "backend/server.js"]