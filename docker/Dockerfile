FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better cache)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

EXPOSE 4321

# Astro dev server, bound to all interfaces so it's reachable from host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
