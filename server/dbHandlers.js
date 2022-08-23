const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalProject");

    console.log(req.body);

    const newUser = {
      _id: req.body.sub,
      userFirstname: req.body.userFirstName,
      userLastname: req.body.userLastName,
      userEmail: req.body.userEmail,
    };

    //Write logic to see if the user already exists

    const userAdded = await db.collection("users").insertOne(newUser);
    userAdded
      ? res.status(200).json({ data: userAdded, message: "User Added" })
      : res.status(404).json({ data: userAdded, message: "Not Found" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  addUser,
};
