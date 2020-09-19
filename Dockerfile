FROM node:10-alpine
COPY package.json /package.json
RUN npm install
COPY . /
EXPOSE 8080
CMD [ "node", "app.js" ]


