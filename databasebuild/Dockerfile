FROM mongo:latest
#Change all the env variables 
ENV DB_NAME=value
ENV MONGO_INITDB_ROOT_PASSWORD=value
ENV MONGO_INITDB_ROOT_USERNAME=value
ENV DB_USER=value
ENV DB_PASS=****
############################
COPY init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js
EXPOSE 27017
