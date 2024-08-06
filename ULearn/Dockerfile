FROM node:20.0.0-alpine AS frontend

WORKDIR /ulearn

# Copy package files
COPY ulearn/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ulearn

# Build frontend
RUN npm run build