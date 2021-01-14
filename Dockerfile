FROM node:15.5.1-alpine3.10

EXPOSE 8081

RUN mkdir -p /app
WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

CMD ["npm", "start"]