# ---------- Stage 1: Build the Node project ----------
FROM node:24 AS builder
WORKDIR /app
COPY package.json package-lock.json .npmrc* ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run pre-docker

# ---------- Stage 2: Serve with nginx ----------
FROM nginx:alpine
RUN apk add --no-cache gettext
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/nginx.conf.template
ENV NGINX_PORT=80
CMD envsubst '$NGINX_PORT' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf \
    && nginx -g 'daemon off;'
