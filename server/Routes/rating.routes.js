const express = require("express");
const router = express.Router();

const { addRatings, getRatings, updateRatings } = require("../dbHandlers");

router.post("/", addRatings);
router.get("/", getRatings);
router.patch("/", updateRatings);

module.exports = router;
