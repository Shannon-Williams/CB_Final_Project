import StyledAnimeCard, { Image } from "./styled/AnimeCard.styled";
import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AnimeCard = ({ anime }) => {
  const { user } = useAuth0();

  const postToFavourties = async (anime) => {
    const res = fetch(`/api/favourite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anime),
    });
  };

  const test = () => {
    console.log(`test`);
  };

  return (
    <Wrapper>
      <Link style={{ textDecoration: "none" }} to={`/anime/${anime.mal_id}`}>
        <StyledAnimeCard onClick={() => {}}>
          <Image src={`${anime?.images?.jpg?.large_image_url}`} />
          <h3>{anime?.title}</h3>
        </StyledAnimeCard>
      </Link>
      {user && (
        <FavouriteButton
          onClickFunc={() => {
            console.log(`test`);
            console.log(`On Click anime`, anime);
          }}
        />
      )}
    </Wrapper>
  );
};

export default AnimeCard;

const Wrapper = styled.div``;
