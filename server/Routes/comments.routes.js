const express = require("express");
const router = express.Router();

const { addComment, getComments, deleteComment } = require("../dbHandlers");

router.post("/", addComment);
router.get("/", getComments);
router.delete("/", deleteComment);

module.exports = router;
