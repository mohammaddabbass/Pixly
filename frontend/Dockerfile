FROM node:22-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Run react server
RUN npm run dev

# Start the Electron app
CMD ["npm", "start"]
