FROM node:16.20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm","run","dev"]
