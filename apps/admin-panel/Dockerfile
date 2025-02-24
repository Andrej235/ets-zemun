# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY /apps/admin-panel/package*.json ./

# Install dependencies
RUN npm install

# Copy the shared frontend files into a sibling directory inside the container
COPY /apps/shared-frontend /shared-frontend

# Copy the rest of the project files into the container
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
