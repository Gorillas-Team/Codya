FROM node:14-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
CMD ["yarn", "start"]
