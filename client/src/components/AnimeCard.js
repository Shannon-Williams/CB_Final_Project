import StyledAnimeCard, { Image } from "./styled/AnimeCard.styled";
import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/anime/${anime.mal_id}`}>
      <StyledAnimeCard onClick={() => {}}>
        <Image src={`${anime?.images?.jpg?.large_image_url}`} />
        <h3>{anime?.title}</h3>
      </StyledAnimeCard>
    </Link>
  );
};

export default AnimeCard;
