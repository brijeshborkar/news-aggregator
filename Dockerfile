# Step 1: Use Node.js image to build the React app
FROM node:18.1.0 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the React app
COPY . .
RUN npm run build

# Step 2: Use Nginx to serve the built React app
FROM nginx:alpine

# Copy built files from the previous step into Nginx's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
