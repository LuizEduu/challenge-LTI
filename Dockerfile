FROM node:22-slim

USER node

WORKDIR  /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "tail", "-f", "/dev/null" ]