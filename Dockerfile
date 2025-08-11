# Use Node.js base image
FROM node:23.11.0-bookworm-slim

# Set the working directory
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia arquivos do projeto
COPY package.json pnpm-lock.yaml ./

# Copy the rest of the application files
COPY . .

# Install dependencies
RUN pnpm install

# Expose application port
EXPOSE 3000

# Set entrypoint script
ENTRYPOINT [ "pnpm", "run" ]
CMD [ "start" ]
