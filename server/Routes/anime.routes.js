const express = require("express");
const router = express.Router();

const {
  getAnimeSearchByQuery,
  getAnimeGenres,
  getAnimeSearchById,
} = require("../jikanHandlers");

router.get("/id/:id", getAnimeSearchById);
router.get(`/search/`, getAnimeSearchByQuery);
router.get(`/genres`, getAnimeGenres);

module.exports = router;
