#Sample Dockerfile for NodeJS Apps

FROM node:21

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN npm run init

COPY . .

EXPOSE 80

CMD [ "npm", "run start" ]