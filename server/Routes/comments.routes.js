const express = require("express");
const router = express.Router();

const { addComment, getComments, deleteComment } = require("../dbHandlers");

router.post("/", addComment);
router.get("/:anime_id", getComments);
router.delete("/", deleteComment);

module.exports = router;
