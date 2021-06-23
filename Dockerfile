FROM node:14
WORKDIR /app
COPY . .
ENV PORT=3000
RUN npm ci --only=production
RUN npm install -g @angular/cli

EXPOSE ${PORT}
CMD [ "npm", "start" ]
