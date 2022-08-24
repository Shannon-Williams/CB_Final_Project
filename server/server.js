// const { query } = require("express");
const express = require("express");
const app = express();
const port = 8000;
const jikanURL = "https://api.jikan.moe/v4/anime";
// `https://api.jikan.moe/v4/anime?q=${query}`

app.use(express.json());

const {
  getAnimeSearchByQuery,
  getAnimeGenres,
  getAnimeSearchById,
} = require("./jikanHandlers");

const {
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
} = require("./dbHandlers");

//Test endpoint
app.get("/api/test", (req, res) => {
  console.log("I am being called");
  res.status(200).json({ message: "HomePage! From Server" });
});

// Database Endpoints
app.post("/api/user", addUser);
app.post("/api/favourite", addToFavourites);
app.get("/api/favourite", getFavourites);
app.delete("/api/favourite", deleteFromFavourites);
app.post("/api/watchlist", addToWatchlist);
app.get("/api/watchlist", getWatchlist);
app.delete("/api/watchlist", deleteFromWatchlist);
app.post("/api/history", addToHistory);
app.get("/api/history", getHistory);
app.delete("/api/history", deleteFromHistory);
app.post("/api/rating", addRatings);
app.get("/api/rating", getRatings);
app.get("/api/test/rating", updateRatings);
app.post("/api/comments", addComment);
app.get("/api/comments", getComments);
app.delete("/api/comments", deleteComment);

// JikanAPI Endpoints
app.get("/api/anime/id/:malId", getAnimeSearchById);
app.get(`/api/anime/:animeQuery`, getAnimeSearchByQuery);
app.get(`/api/genres/anime`, getAnimeGenres);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
