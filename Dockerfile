# frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build

# backend
FROM node:20 AS backend-build
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend .
RUN npm run build

# prod
FROM node:20-slim
WORKDIR /app
# backend
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/package*.json ./backend/
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
# frontend
COPY --from=frontend-build /app/frontend/dist ./backend/dist/frontend

EXPOSE 3000

CMD ["node", "backend/dist/server.js"]
