FROM node:14-alpine

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

RUN yarn
RUN apk --no-cache add ca-certificates wget  && \
        wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
        wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
        apk add glibc-2.29-r0.apk && \
        yarn add canvas

COPY . .
CMD ["yarn", "start"]
