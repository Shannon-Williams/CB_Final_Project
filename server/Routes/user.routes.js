const express = require("express");
const router = express.Router();

const {
  addUser,
  addProfileBanner,
  getProfileBanner,
} = require("../dbHandlers");

router.post("/", addUser);
router.patch("/", addProfileBanner);
router.get("/:id", getProfileBanner);
module.exports = router;
