FROM node:12-slim

WORKDIR /usr/app/clean-api

COPY ./package.json .

RUN npm install --only=prod

