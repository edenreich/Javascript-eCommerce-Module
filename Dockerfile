FROM node:alpine

LABEL maintainer.name="Eden Reich" maintainer.email="eden.reich@gmail.com"

COPY . /app

VOLUME /app

WORKDIR /app

EXPOSE 3000