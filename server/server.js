const express = require("express");
const app = express();
const port = 8000;
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const fetch = require("node-fetch");
const jikanURL = "https://api.jikan.moe/v4/anime";
// `https://api.jikan.moe/v4/anime?q=${query}`

const authToken = require("./Middleware/auth.middleware");

const favouritesRouter = require("./Routes/favourite.routes");
const watchlistRouter = require("./Routes/watchlist.routes");
const historyRouter = require("./Routes/history.routes");
const ratingRouter = require("./Routes/rating.routes");
const commentsRouter = require("./Routes/comments.routes");
const animeRouter = require("./Routes/anime.routes");
const userRouter = require("./Routes/user.routes");

app.use(express.json());
//
// const verifyJwt = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://dev-u-gbqqbo.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "https://concordiabootcamp/final_project",
//   issuer: "https://dev-u-gbqqbo.us.auth0.com/",
//   algorithms: ["RS256"],
// }).unless({ path: ["/api/test"] });

// app.use(verifyJwt);

//DB Router Middleware

app.use("/api/user", userRouter);
app.use("/api/favourite", favouritesRouter);
app.use("/api/favourite", favouritesRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/history", historyRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/comments", commentsRouter);

//JikanAPI Router Middleware
app.use("/api/anime", animeRouter);

//Test endpoint
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Hello! This is not protected" });
});
app.get("/api/test/protected", authToken, (req, res) => {
  res.status(200).json({ message: "Hello! This is protected", data: req.sub });
});

app.get("/api/test/protected2", (req, res) => {
  res.status(200).json({ message: "Hello! This is protected" });
});

// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   const status = error.status || 500;
//   const message = error.message || "Internal Server Error";
//   res.status(status).json(message);
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
