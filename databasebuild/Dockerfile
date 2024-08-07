FROM mongo:latest
ENV MONGO_INITDB_ROOT_INITDB=mydatabase
ENV MONGO_INITDB_ROOT_PASSWORD=example
ENV MONGO_INITDB_ROOT_USERNAME=root
COPY init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js
EXPOSE 27017
