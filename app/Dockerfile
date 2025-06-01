# Use the official Node.js image from the Docker Hub
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./app /app

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
