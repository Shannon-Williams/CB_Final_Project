import AnimeCard from "./AnimeCard";
import StyledAnimeList from "./styled/AnimeList.styled";

const AnimeList = ({ animeList }) => {
  console.log(animeList[0]);
  return (
    <StyledAnimeList>
      {animeList.map((anime) => {
        return <AnimeCard key={anime.mal_id} anime={anime} />;
      })}
    </StyledAnimeList>
  );
};

export default AnimeList;
