# 1. Use a specific version (better for stability)
FROM node:20

# 2. Use an absolute path for the working directory
WORKDIR /app

# 3. Copy only the package files first
# Syntax: COPY [source_on_host] [destination_in_container]
COPY package*.json ./

# 4. Run the install
RUN npm install

# 5. Copy the rest of your code
COPY . .

# 6. Use quotes for the CMD array and 'node' or 'npm'
CMD ["npx", "nodemon", "index.js"]