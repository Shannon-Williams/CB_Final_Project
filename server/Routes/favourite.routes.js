const express = require("express");
const router = express.Router();

const {
  addToFavourites,
  getFavourites,
  deleteFromFavourites,
} = require("../dbHandlers");

router.post("/", addToFavourites);
router.get("/", getFavourites);
router.delete("/", deleteFromFavourites);

module.exports = router;