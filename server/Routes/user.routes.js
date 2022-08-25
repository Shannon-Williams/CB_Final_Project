const express = require("express");
const router = express.Router();

const { addUser } = require("../dbHandlers");

router.post("/", addUser);

module.exports = router;
