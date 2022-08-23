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
      profile: {
        favourites: [],
        watchlist: [],
        history: [],
      },
    };
    const existingUser = await db
      .collection("users")
      .findOne({ _id: req.body.sub });

    if (!existingUser) {
      const userAdded = await db.collection("users").insertOne(newUser);
      userAdded
        ? res.status(200).json({ data: userAdded, message: "User Added" })
        : res
            .status(404)
            .json({ data: userAdded, message: "Something Went Wrong" });
    } else {
      res.status(500).json({ message: "User Already Exists" });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const addToFavourites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const anime = req.body;

  const query = { _id: "1234" }; // should be user id from the request
  const favouritedAnime = {
    $addToSet: { "profile.favourites": anime },
  };

  const animeAddedToFavorites = await db
    .collection("users")
    .findOneAndUpdate(query, favouritedAnime);

  animeAddedToFavorites
    ? res.status(200).json({ message: "Anime Added" })
    : res.status(404).json({ message: "Something Went Wrong" });
};

const getFavourites = async (req, res) => {};

module.exports = {
  addUser,
  addToFavourites,
};
