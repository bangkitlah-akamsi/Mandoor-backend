FROM node:18.15

WORKDIR /usr/scr/mandoor-test

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]