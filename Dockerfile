FROM node:16.4.2-alpine as base
WORKDIR /users-api
COPY . /users-api

RUN npm install --loglevel=warn
# RUN npm run lint

EXPOSE 3000
RUN npm run build
CMD [ "npm", "run", "start:prod"]