FROM node:18-alpine AS base

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]