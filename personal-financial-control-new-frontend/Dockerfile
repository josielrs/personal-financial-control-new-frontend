# Use an official node image
FROM node:lts-jod

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package file to the container
COPY package*.json ./

# install dependencies
RUN npm cache clean --force
RUN npm install -g npm@10.9.2
RUN npm install --legacy-peer-deps

# Copy the application code into the container
COPY . .

# Expose used port
EXPOSE 3000

# environment command
CMD ["npm", "start"]