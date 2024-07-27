FROM node:22-slim

RUN apt update -y && apt upgrade -y

COPY . /app

WORKDIR /app

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]