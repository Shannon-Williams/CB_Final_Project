import StyledAnimeCard, { Image } from "./styled/AnimeCard.styled";
import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import HistoryButton from "./HistoryButton";
import Watchlist from "./WatchlistButton";
import RemoveButton from "./RemoveButton";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AnimeCard = ({ anime, profileTypeId }) => {
  const { user } = useAuth0();

  const postToFavourties = async () => {
    console.log(`Anime is this`, anime);
    const res = await fetch(`/api/favourite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({ id: user.sub, anime: anime }),
    });
  };

  const deleteFromFavourties = async () => {
    if (profileTypeId === "favourites") {
      const res = await fetch(`/api/favourite`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.sub,
          anime: anime,
          profileTypeId: profileTypeId,
        }),
      });
    } else {
      const res = await fetch(`/api/${profileTypeId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.sub,
          anime: anime,
          profileTypeId: profileTypeId,
        }),
      });
    }
  };

  const postToHistory = async () => {
    console.log(`Anime is this`, anime);
    const res = await fetch(`/api/history`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.sub, anime: anime }),
    });
  };

  const postToWatchlist = async () => {
    console.log(`Anime is this`, anime);
    const res = await fetch(`/api/watchlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.sub, anime: anime }),
    });
  };

  return (
    <Wrapper>
      <Link style={{ textDecoration: "none" }} to={`/anime/${anime.mal_id}`}>
        <StyledAnimeCard onClick={() => {}}>
          <Image src={`${anime?.images?.jpg?.large_image_url}`} />
        </StyledAnimeCard>
      </Link>
      {user && (
        <>
          <FavouriteButton onClickFunc={postToFavourties} />
          <HistoryButton onClickFunc={postToHistory} />
          <Watchlist onClickFunc={postToWatchlist} />
          <RemoveButton onClickFunc={deleteFromFavourties} />
        </>
      )}
    </Wrapper>
  );
};

export default AnimeCard;

const Wrapper = styled.div``;
