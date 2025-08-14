# ---------- Stage 1: Build the Node project ----------
FROM node:24 AS builder
RUN apt-get update \
  && apt-get install -y --no-install-recommends brotli \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json .npmrc* ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run pre-docker

# ---------- Stage 2: Serve with nginx ----------
FROM docker.io/martinhillford/nginx-extended
COPY --from=builder /app/dist /usr/share/nginx/html

