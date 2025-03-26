# Use Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Give execution permission
RUN chmod +x /entrypoint.sh

# Expose application port
EXPOSE 3000

# Set entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
