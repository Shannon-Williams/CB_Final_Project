const { query } = require("express");
const express = require("express");
const app = express();
const port = 8000;
const jikanURL = "https://api.jikan.moe/v4/anime";
// `https://api.jikan.moe/v4/anime?q=${query}`

const { getAnimeSearch } = require("./jikanHandlers");

app.get("/api/test", (req, res) => {
  console.log("I am being called");
  res.status(200).json({ message: "HomePage! From Server" });
});

app.get(`/anime/:animeQuery`, getAnimeSearch);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
