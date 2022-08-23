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

  try {
    const animeAddedToFavorites = await db
      .collection("users")
      .findOneAndUpdate(query, favouritedAnime);

    animeAddedToFavorites
      ? res.status(200).json({ message: "Anime Added" })
      : res.status(404).json({ message: "Something Went Wrong" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getFavourites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const query = { _id: "1234" }; // should be user id from the request
  const result = await db.collection("users").findOne(query);

  const favouritesAnimeList = result?.profile?.favourites;

  result
    ? res.status(200).json({
        data: favouritesAnimeList,
        message: "Favourite Anime Found",
      })
    : res.status(404).json({
        data: favouritesAnimeList,
        message: "Something Went Wrong",
      });
};

const deleteFromFavourites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  try {
    const query = { _id: "1234" }; // should be user id from the request
    const removedAnime = {
      $pull: { "profile.favourites": { name: "mob" } }, // should be anime id
    };

    const deletedAnime = await db
      .collection("users")
      .findOneAndUpdate(query, removedAnime);

    deletedAnime.lastErrorObject.updatedExisting
      ? res.status(201).json({
          data: deletedAnime,
          message: "Deleted Anime Found",
        })
      : res.status(404).json({
          data: deletedAnime,
          message: "Something Went Wrong",
        });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  addUser,
  addToFavourites,
  getFavourites,
  deleteFromFavourites,
};
