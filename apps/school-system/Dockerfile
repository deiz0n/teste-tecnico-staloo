FROM node:24.12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx nest build school-system

EXPOSE 3000

CMD ["node", "dist/apps/school-system/main"]