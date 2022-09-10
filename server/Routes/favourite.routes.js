const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  addToFavourites,
  getFavourites,
  deleteFromFavourites,
} = require("../dbHandlers");

router.post("/", addToFavourites);
router.get("/:id", getFavourites);
router.patch("/", deleteFromFavourites);

module.exports = router;
