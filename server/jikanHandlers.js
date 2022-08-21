const fetch = require("node-fetch");

const getAnimeSearchByQuery = async (req, res) => {
  const { animeQuery } = req.params;
  // const query = animeQuery.toLowercase();
  console.log(`Animesearch`, animeQuery);

  const fetchAnimeSearch = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${animeQuery}&sfw`
    );
    const { data } = await res.json();
    return data;
  };

  fetchAnimeSearch().then((data) => {
    res.status(200).json({ data: data });
  });
};

const getAnimeSearchById = async (req, res) => {
  const { malId } = req.params;
  const fetchAnimeSearch = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${malId}/full`);
    const { data } = await res.json();
    return data;
  };

  fetchAnimeSearch().then((data) => {
    res.status(200).json({ data: data });
  });
};

const getAnimeGenres = async (req, res) => {
  const fetchAnimeGenres = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/genres/anime`);
    const { data } = await res.json();

    return data;
  };

  fetchAnimeGenres().then((data) => {
    res.status(200).json({ data: data });
  });
};

module.exports = {
  getAnimeSearchByQuery,
  getAnimeGenres,
  getAnimeSearchById,
};
