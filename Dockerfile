FROM node:18-alpine AS builder

ARG VITE_BASE_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}

WORKDIR /app


COPY package*.json ./

RUN apk add --no-cache python3 g++ make bash libc6-compat
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
RUN sed -i -E 's/(location\s+\/ \{)/\1\n        try_files \$uri \$uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf

EXPOSE 80