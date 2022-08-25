const express = require("express");
const app = express();
const port = 8000;
const jikanURL = "https://api.jikan.moe/v4/anime";
// `https://api.jikan.moe/v4/anime?q=${query}`

app.use(express.json());

const favouritesRouter = require("./Routes/favourite.routes");
const watchlistRouter = require("./Routes/watchlist.routes");
const historyRouter = require("./Routes/history.routes");
const ratingRouter = require("./Routes/rating.routes");
const commentsRouter = require("./Routes/comments.routes");
const animeRouter = require("./Routes/anime.routes");
const userRouter = require("./Routes/user.routes");

//DB Router Middleware
app.use("/api/user", userRouter);
app.use("/api/favourite", favouritesRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/history", historyRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/comments", commentsRouter);

//JikanAPI Router Middleware
app.use("/api/anime", animeRouter);

//Test endpoint
app.get("/api/test", (req, res) => {
  console.log("I am being called");
  res.status(200).json({ message: "HomePage! From Server" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
