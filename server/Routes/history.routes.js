const express = require("express");
const router = express.Router();

const {
  addToHistory,
  getHistory,
  deleteFromHistory,
} = require("../dbHandlers");

router.post("/", addToHistory);
router.get("/:id", getHistory);
router.delete("/", deleteFromHistory);

module.exports = router;
