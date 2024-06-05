FROM node:16.14.2

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn add mysql2
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
