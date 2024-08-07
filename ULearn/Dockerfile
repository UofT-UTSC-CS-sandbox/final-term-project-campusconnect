FROM node:20.0.0-alpine AS build

WORKDIR /ulearn

# Copy package files
COPY ulearn/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ulearn .

# Build application
RUN npm run build