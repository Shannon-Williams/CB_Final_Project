const express = require("express");
const router = express.Router();

const {
  addToWatchlist,
  getWatchlist,
  updateUserLists,
} = require("../dbHandlers");

router.post("/", addToWatchlist);
router.get("/:id", getWatchlist);
router.patch("/", updateUserLists);

module.exports = router;
