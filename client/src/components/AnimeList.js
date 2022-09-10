import AnimeCard from "./AnimeCard";
import StyledAnimeList from "./styled/AnimeList.styled";

const AnimeList = ({ animeList, profileTypeId }) => {
  return (
    <StyledAnimeList>
      {animeList.map((anime) => {
        return (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            profileTypeId={profileTypeId}
          />
        );
      })}
    </StyledAnimeList>
  );
};

export default AnimeList;
