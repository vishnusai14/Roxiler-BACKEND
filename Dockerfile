FROM node:14
WORKDIR /app
#Change all the env variables 
ENV DB_USER=value 
ENV DB_PASS=value
ENV DB_NAME=value
ENV DB_HOST=value
##########################
COPY package.json /app
COPY package-lock.json /app
RUN rm package-lock.json
RUN npm cache clean --force && npm install
COPY . /app
ENTRYPOINT ["node", "index.js"]
EXPOSE 1331
