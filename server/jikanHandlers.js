const fetch = require("node-fetch");

const getAnimeSearchByQuery = async (req, res) => {
  const { q, genre } = req.query;
  // const query = animeQuery.toLowercase();
  console.log(`Animesearch1 q`, q, `genre`, genre, `params`, req.query);

  const fetchAnimeSearch = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${q}&sfw=true&type=tv`
    );
    const { data } = await res.json();
    return data;
  };

  fetchAnimeSearch().then((data) => {
    res.status(200).json({ data: data });
  });
};

const getAnimeSearchById = async (req, res) => {
  const { id } = req.params;
  console.log(`API id is `, id);
  const fetchAnimeSearch = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
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
