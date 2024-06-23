FROM node:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . /app/

# Build production
RUN npm run build
RUN npm install -g serve

## Start the app on port 80
CMD serve -s dist -l 80