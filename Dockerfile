FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Expose the port on which the server will run
EXPOSE 3000

CMD npm run start:dev