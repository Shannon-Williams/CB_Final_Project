const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

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
      userFirstname: req.body.given_name,
      userLastname: req.body.family_name,
      userEmail: req.body.email,
      profile: {
        favourites: [],
        watchlist: [],
        history: [],
        ratings: [],
      },
      profileBanner: null,
    };
    const existingUser = await db
      .collection("users")
      .findOne({ _id: req.body.sub });

    if (req.body.sub === "undefined") {
      res.status(200).json({ message: `initial check` });
      return;
    }

    if (!existingUser && req.body.sub !== undefined) {
      const userAdded = await db.collection("users").insertOne(newUser);
      userAdded
        ? res.status(200).json({ data: userAdded, message: "User Added" })
        : res
            .status(404)
            .json({ data: userAdded, message: "Something Went Wrong" });
    } else {
      res.status(200).json({ message: "User Already Exists" });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getUser = async (req, res) => {
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
  client.close();
};

const addToFavourites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");

  const { anime, id } = req.body;

  console.log(`dbH add to fav`, id);
  const query = { _id: id }; // should be user id from the request
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

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getFavourites = async (req, res) => {
  const { id } = req.params;
  console.log(`dbH add to fav this should be define`, id);
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const query = { _id: id }; // should be user id from the request
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
  client.close();
};

const updateUserLists = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");

  const { anime, id, profileTypeId } = req.body;
  console.log(`fav patch info`, id, profileTypeId);

  try {
    const query = { _id: id };

    const list = `profile.${profileTypeId}`;
    console.log(`the string list is`, list);

    const removedAnime = {
      $pull: { [list]: { mal_id: Number(anime.mal_id) } }, // should be anime id
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

const addProfileBanner = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");

  const { profileBanner, id } = req.body;

  try {
    const query = { _id: id };
    const value = { $set: { profileBanner: profileBanner } };

    const userProfile = await db
      .collection("users")
      .findOneAndUpdate(query, value);

    userProfile
      ? res.status(200).json({
          data: userProfile,
          message: "Profile Banner Added",
        })
      : res.status(404).json({
          data: userProfile,
          message: "Something Went Wrong",
        });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getProfileBanner = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const { id } = req.params;
  const query = { _id: id }; // should be user id from the request
  const result = await db.collection("users").findOne(query);

  result
    ? res.status(200).json({
        data: result.profileBanner,
        message: "Profile Banner Found",
      })
    : res.status(404).json({
        data: result,
        message: "Something Went Wrong",
      });
};

const deleteFromFavourites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");

  const { anime, id, profileTypeId } = req.body;
  console.log(`fav patch info`, id, profileTypeId);

  try {
    const query = { _id: id };

    const list = `profile.${profileTypeId}`;
    console.log(`the string list is`, list);

    const removedAnime = {
      $pull: { [list]: { mal_id: Number(anime.mal_id) } }, // should be anime id
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

const addToWatchlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const { anime, id } = req.body;

  const query = { _id: id };
  const value = {
    $addToSet: { "profile.watchlist": anime },
  };

  try {
    const animeAddedToWatchlist = await db
      .collection("users")
      .findOneAndUpdate(query, value);

    animeAddedToWatchlist
      ? res.status(200).json({ message: "Anime Added" })
      : res.status(404).json({ message: "Something Went Wrong" });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getWatchlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const { id } = req.params;
  console.log(`dbH add to wl`, id);
  const query = { _id: id }; // should be user id from the request
  const result = await db.collection("users").findOne(query);

  const watchlistAnimeList = result?.profile?.watchlist;

  result
    ? res.status(200).json({
        data: watchlistAnimeList,
        message: "Watchlist Anime Found",
      })
    : res.status(404).json({
        data: watchlistAnimeList,
        message: "Something Went Wrong",
      });

  client.close();
};

const deleteFromWatchlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  try {
    const query = { _id: "1234" }; // should be user id from the request
    const value = {
      $pull: { "profile.watchlist": { name: "kokoro-watchlist" } }, // should be anime id
    };

    const deletedAnime = await db
      .collection("users")
      .findOneAndUpdate(query, value);

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

const addToHistory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const { anime, id } = req.body;
  const query = { _id: id };
  const value = {
    $addToSet: { "profile.history": anime },
  };

  try {
    const animeAddedToWatchlist = await db
      .collection("users")
      .findOneAndUpdate(query, value);

    animeAddedToWatchlist
      ? res.status(200).json({ message: "Anime Added" })
      : res.status(404).json({ message: "Something Went Wrong" });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getHistory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const { id } = req.params;
  const query = { _id: id }; // should be user id from the request
  const result = await db.collection("users").findOne(query);

  const historyAnimeList = result?.profile?.history;

  result
    ? res.status(200).json({
        data: historyAnimeList,
        message: "history Anime Found",
      })
    : res.status(404).json({
        data: historyAnimeList,
        message: "Something Went Wrong",
      });
};

const deleteFromHistory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  try {
    const query = { _id: "1234" }; // should be user id from the request
    const value = {
      $pull: { "profile.history": { name: "mob" } }, // should be anime id
    };

    const deletedAnime = await db
      .collection("users")
      .findOneAndUpdate(query, value);

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

const addRatings = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const { user_id, anime_id, rating } = req.body;
  // console.log(`addRatins`, req.body);
  const query = { user_id: user_id, anime_id: Number(anime_id) };

  try {
    const isRated = await db.collection("ratings").findOne(query);

    // console.log(`is rated `, isRated, typeof isRated);

    if (isRated) {
      const updateAnimeRating = await db
        .collection("ratings")
        .updateOne(query, { $set: { rating: Number(rating) } });
      res.status(200).json({ message: "Rating Updated" });
    } else {
      const animeAddedToRatings = await db.collection("ratings").insertOne({
        _id: uuidv4(),
        user_id: user_id,
        anime_id: Number(anime_id),
        rating: Number(rating),
      });

      res.status(200).json({ data: isRated, message: "Rating Added" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getRatings = async (req, res) => {
  const { id } = req.params;
  const { user_id, anime_id } = req.query;
  const query = { user_id: user_id, anime_id: Number(anime_id) };

  console.log(`getRating `, query);

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");

  try {
    const result = await db.collection("ratings").findOne(query);
    console.log(`db res`, result);

    result
      ? res.status(200).json({
          data: result,
          message: "Rating Found",
        })
      : res.status(200).json({
          data: result,
          message: "Something Went Wrong",
        });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const updateRatings = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const query = {
    _id: "1234",
    name: "mob",
  }; // should be user id from the request
  const value = {
    $set: req.body,
  };

  const result = await db.collection("ratings").updateOne(query, value);

  try {
    res.status(200).json({ data: result, message: "is this working" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const addComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");

  const { anime_id, user_id, comment, nickname, picture } = req.body;

  const value = {
    _id: uuidv4(),
    user_id: user_id,
    anime_id: Number(anime_id),
    comment: comment,
    nickname: nickname,
    picture: picture,
  };

  try {
    const result = await db.collection("comments").insertOne(value);

    result
      ? res.status(200).json({ data: result, message: "Comment Added" })
      : res.status(404).json({ data: result, message: "Something Went Wrong" });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  console.log(`Params `, req.params);
  const { anime_id } = req.params;
  const query = { anime_id: Number(anime_id) }; // should be user id from the request
  const result = await db.collection("comments").find(query).toArray();

  result
    ? res.status(200).json({
        data: result,
        message: "Comments Found",
      })
    : res.status(404).json({
        data: result,
        message: "Something Went Wrong",
      });

  client.close();
};

const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalProject");
  const query = { _id: "12" }; // should be user id from the request
  const result = await db.collection("comments").deleteOne(query);

  result
    ? res.status(200).json({
        data: result,
        message: "Comment Deleted",
      })
    : res.status(404).json({
        data: result,
        message: "Something Went Wrong",
      });

  client.close();
};

module.exports = {
  addUser,
  addToFavourites,
  getFavourites,
  deleteFromFavourites,
  addToWatchlist,
  getWatchlist,
  deleteFromWatchlist,
  addToHistory,
  getHistory,
  deleteFromHistory,
  addRatings,
  getRatings,
  updateRatings,
  addComment,
  getComments,
  deleteComment,
  updateUserLists,
  addProfileBanner,
  getProfileBanner,
};
