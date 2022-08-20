const getAnimeSearch = async (req, res) => {
  const { animeQuery } = req.params;

  const fetchAnimeSearch = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${animeQuery}`);
    const { data } = await res.json();
  };

  res.status(200).json({ data: fetchAnimeSearch() });
};

module.exports = {
  getAnimeSearch,
};
