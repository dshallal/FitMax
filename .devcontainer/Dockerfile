# Use the official Node.js image as base
FROM node:20-bullseye-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    python3 \
    python3-pip \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g \
    @expo/cli \
    expo-cli

# Set the working directory
WORKDIR /workspace

# Change ownership of the workspace to the node user
RUN chown -R node:node /workspace

# Switch to the node user
USER node

# Set environment variables
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Expose ports for Expo and Metro
EXPOSE 8081 19000 19001 19002

# Default command
CMD ["bash"]
