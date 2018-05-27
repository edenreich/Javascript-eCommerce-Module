FROM node:alpine

LABEL maintainer.name="Eden Reich" maintainer.email="eden.reich@gmail.com"

WORKDIR /app

COPY . /app

VOLUME /app

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000
