# ---- deps ---------------------------------------------------------------
FROM node:20-alpine AS deps
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- builder ------------------------------------------------------------
FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public env vars are inlined at build time by Next -> must exist here.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_NAME
# Server-only vars are validated by config/env.ts during prerender.
ARG API_BASE_URL
ARG SESSION_COOKIE_NAME=abzar_session
ARG DOCUMENT_SIGNING_SECRET
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME \
    API_BASE_URL=$API_BASE_URL \
    SESSION_COOKIE_NAME=$SESSION_COOKIE_NAME \
    DOCUMENT_SIGNING_SECRET=$DOCUMENT_SIGNING_SECRET \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    NODE_OPTIONS=--max-old-space-size=3072

RUN pnpm build

# ---- runner -------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN apk add --no-cache curl \
 && addgroup -g 1001 -S nodejs \
 && adduser -u 1001 -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
