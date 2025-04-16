# Dockerfile (frontend/)

# Use a single-stage build to avoid missing dependencies like `next`
FROM node:18-alpine

WORKDIR .

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build
COPY . .

# Set environment and expose port
EXPOSE 3000

# Start the Next.js app
CMD npm run dev
