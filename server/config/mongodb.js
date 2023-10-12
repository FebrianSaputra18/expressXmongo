const { MongoClient  } = require("mongodb");

const url = "mongodb://root:root@localhost:27017?authSource=admin";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
})();

const db = client.db('mydatabase')

module.exports = db;