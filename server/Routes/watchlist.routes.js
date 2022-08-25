const express = require("express");
const router = express.Router();

const {
  addToWatchlist,
  getWatchlist,
  deleteFromWatchlist,
} = require("../dbHandlers");

router.post("/", addToWatchlist);
router.get("/", getWatchlist);
router.delete("/", deleteFromWatchlist);

module.exports = router;
