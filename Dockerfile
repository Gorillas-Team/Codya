FROM node:14-alpine

# Adding canvas dependencies
RUN apk add --no-cache \
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        python \
        ;


WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn --prod

COPY . .
CMD ["yarn", "start"]
