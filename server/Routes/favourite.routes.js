const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  addToFavourites,
  getFavourites,
  updateUserLists,
} = require("../dbHandlers");

router.post("/", addToFavourites);
router.get("/:id", getFavourites);
router.patch("/", updateUserLists);

module.exports = router;
