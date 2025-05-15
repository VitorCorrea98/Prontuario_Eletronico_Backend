# Use Node.js base image
FROM node:23.11.0-bookworm-slim

# Set the working directory
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Copy the rest of the application files
COPY . .

# Install dependencies
RUN npm install

# Expose application port
EXPOSE 3000

# Set entrypoint script
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
