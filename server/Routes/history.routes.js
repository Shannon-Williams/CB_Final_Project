const express = require("express");
const router = express.Router();

const { addToHistory, getHistory, updateUserLists } = require("../dbHandlers");

router.post("/", addToHistory);
router.get("/:id", getHistory);
router.patch("/", updateUserLists);

module.exports = router;
