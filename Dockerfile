FROM node:10-alpine
COPY package.json /package.json
RUN npm install
COPY . /
EXPOSE 3000
CMD [ "node", "app.js" ]

