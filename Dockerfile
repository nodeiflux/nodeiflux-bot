FROM node:lts-alpine

WORKDIR /app
RUN chown -R node:node /app
USER node

COPY . /app/

CMD [ "node", "./dist/src/index.js" ]