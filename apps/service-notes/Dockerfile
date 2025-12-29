FROM node:24.12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx nest build service-notes

EXPOSE 3000

CMD ["node", "dist/apps/service-notes/main"]