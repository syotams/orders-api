FROM node:latest
RUN mkdir -p /application
WORKDIR /application
COPY package.json /application/
RUN npm install
COPY . /application
EXPOSE 3000
CMD npm run devstart #[ "npm", "run", "devstart" ]