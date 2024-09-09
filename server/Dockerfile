FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/src/extensions/upload/providers/custom-provider

COPY src/extensions/upload/providers/custom-provider/package.json ./
RUN npm install

WORKDIR /app

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "develop"]
