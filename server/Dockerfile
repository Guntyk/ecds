FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app /app

EXPOSE 1337

CMD ["npm", "start"]
