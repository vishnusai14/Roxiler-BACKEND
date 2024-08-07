FROM node:14
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN rm package-lock.json
RUN npm cache clean --force && npm install
COPY . /app
ENTRYPOINT ["node", "index.js"]
EXPOSE 1331
