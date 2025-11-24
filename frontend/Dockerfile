FROM node:16 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

RUN npm run build

FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3001
EXPOSE 80

# Start the development server
CMD ["nginx", "-g", "daemon off;"]