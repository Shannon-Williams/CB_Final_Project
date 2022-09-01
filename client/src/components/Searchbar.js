import Input from "./styled/elements/Input";
import Button from "./styled/elements/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Searchbar = ({}) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [genreSelection, setGenreSelection] = useState("All");
  const [genres, setGenres] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");
  const genre = searchParams.get("genre");

  const fetchAnimeSearchResults = async () => {
    setLoading(true);
    const res = await fetch(`/api/anime/search/?q=${search}`);
    const { data } = await res.json();
    setSearchResults(data);
    setLoading(false);
    return data;
  };

  const fetchGenres = async () => {
    const res = await fetch(`/api/anime/genres`);
    const { data } = await res.json();
    setGenres(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const sortedGenres = genres
      .sort((a, b) => {
        return b.count - a.count;
      })
      .slice(0, 12);

    console.log(`sorted`, sortedGenres);
  }, [genres]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  // This will be for a search page
  // useEffect(() => {
  //   // Search the api
  //   setLoading(true);
  //   fetchAnimeSearchResults();
  //   setLoading(false);
  // }, [search]);

  const HandleSearch = () => {
    setSearchParams({ q: `${search}`, genre: `${genreSelection}` });
    fetchAnimeSearchResults();
    setSearch("");
  };

  return (
    <>
      <Wrapper>
        <Input
          type={"search"}
          placeholder={"Search.."}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button onClick={HandleSearch}>Search</Button>
      </Wrapper>
      {JSON.stringify(searchResults[0])}
    </>
  );
};

export default Searchbar;

const Wrapper = styled.div``;
