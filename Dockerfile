FROM node:14
WORKDIR /app
COPY . .
ENV PORT=3000
RUN npm ci
RUN npm install -g @angular/cli

EXPOSE 3000
CMD [ "npm", "start" ]
