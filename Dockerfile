# Use a multi-stage build to optimize caching and minimize final image size
# Base stage for common setup
FROM docker.io/node:18-alpine AS base
WORKDIR /app

COPY . ./

# RUN npm install

# Builder stage to handle dependency installation and pruning
FROM base AS builder
COPY package.json package-lock.json ./
# Install global dependencies for the build process
RUN apk add --no-cache libc6-compat && \
  apk update && \
  npm install -g turbo

# Use turbo to prune dependencies
# This command assumes your project uses turbo and is set up accordingly
RUN turbo prune api --docker

# Copy the pruned files and install dependencies
FROM base AS installer
COPY --from=builder /app/out/full/ ./
RUN npm ci --prefer-offline --no-audit

# Final stage to build the application
FROM installer AS final

# Set environment variables as needed
ENV CI=true \
  WG_COPY_BIN_PATH=/usr/bin/wunderctl \
  WG_NODE_URL=http://127.0.0.1:9991 \
  WG_NODE_INTERNAL_URL=http://127.0.0.1:9993 \
  WG_NODE_HOST=0.0.0.0 \
  WG_NODE_PORT=9991 \
  WG_NODE_INTERNAL_PORT=9993 \
  WG_SERVER_URL=http://127.0.0.1:9992 \
  WG_SERVER_HOST=127.0.0.1 \
  WG_SERVER_PORT=9992 \
  WG_PUBLIC_NODE_URL=${wg_public_node_url}

# Generate the WunderGraph client
# RUN wunderctl generate --wundergraph-dir=.
RUN npm run api:build

# Expose the necessary ports
EXPOSE 9991

# Define the command to run your application
# CMD wunderctl start --wundergraph-dir=.
CMD npm run api:start
