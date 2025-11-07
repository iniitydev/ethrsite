FROM node:18-alpine AS builder

# Install dependencies for build
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/
COPY .env.example ./

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 payload

# Copy built application and dependencies
COPY --from=builder --chown=payload:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=payload:nodejs /app/package.json ./
COPY --from=builder --chown=payload:nodejs /app/src ./src
COPY --from=builder --chown=payload:nodejs /app/tsconfig.json ./

# Create uploads directory
RUN mkdir -p /app/uploads && chown -R payload:nodejs /app/uploads

# Switch to non-root user
USER payload

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Use dumb-init to handle signals properly
CMD ["dumb-init", "node", "src/server.js"]