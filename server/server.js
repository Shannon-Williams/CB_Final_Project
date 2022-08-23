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

const { addUser } = require("./dbHandlers");

// Database Endpoints
app.post("/api/user", addUser);
app.get("/api/test", (req, res) => {
  console.log("I am being called");
  res.status(200).json({ message: "HomePage! From Server" });
});

// JikanAPI Endpoints
app.get("/api/anime/id/:malId", getAnimeSearchById);
app.get(`/api/anime/:animeQuery`, getAnimeSearchByQuery);
app.get(`/api/genres/anime`, getAnimeGenres);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
