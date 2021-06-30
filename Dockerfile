FROM node:14
WORKDIR /app
COPY . .

RUN npm ci
RUN npm install -g @angular/cli

CMD [ "npm", "start" ]
