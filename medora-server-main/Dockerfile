# ===========================
# 1️⃣ Base image
# ===========================
FROM node:20.12.2-slim

# Set working directory
WORKDIR /usr/src/app

# ===========================
# 2️⃣ Install dependencies
# ===========================
# Copy package.json and package-lock.json separately
# to leverage Docker cache for faster builds
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# ===========================
# 3️⃣ Copy source code
# ===========================
COPY . .

# ===========================
# 4️⃣ Set environment variables (optional defaults)
# ===========================
ENV NODE_ENV=production
ENV PORT=3000

# ===========================
# 5️⃣ Expose port
# ===========================
EXPOSE 3000

# ===========================
# 6️⃣ Health check
# ===========================
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# ===========================
# 7️⃣ Start command
# ===========================
CMD ["node", "server.js"]

# ===========================
# Copy package.json and package-lock.json separately
# to leverage Docker cache for faster builds
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# ===========================
# 3️⃣ Copy source code
# ===========================
COPY . .

# ===========================
# 4️⃣ Set environment variables (optional defaults)
# ===========================
ENV NODE_ENV=production
ENV PORT=3000

# ===========================
# 5️⃣ Expose port
# ===========================
EXPOSE 3000

# ===========================
# 6️⃣ Health check
# ===========================
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# ===========================
# 7️⃣ Start command
# ===========================
CMD ["node", "server.js"]
