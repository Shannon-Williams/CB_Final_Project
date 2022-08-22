const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const testUser = {
  name: "TestUser",
  email: "test@test",
};

const testImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("finalProject");
    console.log("connected");

    const result = await db.collection("users").insertOne(testUser);

    console.log("success");
    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

testImport();
