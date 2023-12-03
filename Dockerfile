FROM node:18.15

WORKDIR /usr/scr/mandoor-test

COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start-prod"]