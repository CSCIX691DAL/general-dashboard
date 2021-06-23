FROM node:14
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
CMD [ "npm", "start" ]
