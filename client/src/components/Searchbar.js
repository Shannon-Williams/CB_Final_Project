import Input from "./styled/elements/Input";
import Button from "./styled/elements/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AnimeList from "./AnimeList";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";

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
  }, [genres]);

  const HandleSearch = () => {
    setSearchParams({ q: `${search}`, genre: `${genreSelection}` });
    fetchAnimeSearchResults();
    setSearch("");
  };

  return (
    <Wrapper>
      <SearchBarContainer>
        <StyledInput
          type={"text"}
          placeholder={"Search for animes..."}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <StyledButton onClick={HandleSearch}>
          <SearchIcon color={`var(--gray)`} size={20} />
        </StyledButton>
      </SearchBarContainer>
      <AnimeListContainer>
        <AnimeList key={"animelist"} animeList={searchResults} />
      </AnimeListContainer>
    </Wrapper>
  );
};

export default Searchbar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  /* margin: 2rem 0 0 0; */
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// Maybe this should be a form so we can hit enter to submit search, or add an eventlistener for enter
const SearchBarContainer = styled.div`
  border: 1px var(--border) solid;
  border-radius: 7px;
  /* height: fit-content; */
  overflow: hidden;
  padding: 0.25rem 1rem;
  position: relative;
  width: 300px;
`;

const StyledInput = styled(Input)`
  border: none;
  &:focus {
    outline: none;
  }

  &::placeholder {
    /* text-align: center; */
  }
`;

const StyledButton = styled(Button)`
  display: inline-flex;
  border: none;
  align-items: center;
  height: 100%;
  position: absolute;
  right: 0.5rem;
  bottom: 1%;
`;

const AnimeListContainer = styled.div`
  width: 100%;
  height: 1px;
  border: 1px green solid;
`;
