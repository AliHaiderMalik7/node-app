# Use an official Node.js runtime as the base image
FROM node:18

# Create and set working directory inside the container
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port (adjust based on your app)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]