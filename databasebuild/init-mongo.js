// init-mongo.mjs

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const database = process.env.MONGO_INITDB_DATABASE;
const url = `mongodb://${username}:${password}@localhost:27017/admin`;

const conn = new Mongo(url);
const db = conn.getDB(database);

// Create a new user with roles
db.createUser({
  user: username,
  pwd: password,
  roles: [{ role: 'readWrite', db: database }]
});

// Insert initial data
/*db.mycollection.insertMany([
  { name: "Alice", age: 30, occupation: "Engineer" },
  { name: "Bob", age: 25, occupation: "Designer" },
  { name: "Charlie", age: 35, occupation: "Teacher" }
]);*/

print('Initial User inserted');

