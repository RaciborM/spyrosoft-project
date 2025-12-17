#frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

#backend
FROM node:20
WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend ./backend
COPY --from=frontend-build /app/frontend/dist ./backend/public

WORKDIR /app/backend

EXPOSE 3000
CMD ["npm", "start"]

