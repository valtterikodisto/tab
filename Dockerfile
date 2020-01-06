FROM node:12.14.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./
RUN npm install

WORKDIR /usr/src/app

COPY . .

RUN npm run build:ui

EXPOSE 3001
CMD npm start