import { Image } from "./styled/AnimeCard.styled";
// import StyledAnimeCard, { Image } from "./styled/AnimeCard.styled";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import HistoryButton from "./HistoryButton";
import Watchlist from "./WatchlistButton";
import RemoveButton from "./RemoveButton";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useState } from "react";

const AnimeCard = ({ anime, profileTypeId, grayscale }) => {
  const { user } = useAuth0();
  const [filter, setFilter] = useState(grayscale);

  console.log(useParams());

  let profileId = useParams().profileTypeId;

  profileTypeId = profileTypeId ? profileTypeId : profileId;

  console.log(`animecare`, profileTypeId);

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

  const updateUserLists = async () => {
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
    <Container>
      <Wrapper>
        <Link style={{ textDecoration: "none" }} to={`/anime/${anime.mal_id}`}>
          <StyledAnimeCard
            filter={filter}
            onMouseEnter={() => {
              console.log(filter);
              setFilter(false);
            }}
            onMouseLeave={() => {
              setFilter(true);
            }}
            hover={true}
          >
            <Image src={`${anime?.images?.jpg?.large_image_url}`} />
          </StyledAnimeCard>
        </Link>
      </Wrapper>
      {user && (
        <ButtonContainer>
          <RemoveButton onClickFunc={updateUserLists} />
          <FavouriteButton onClickFunc={postToFavourties} />
          <HistoryButton onClickFunc={postToHistory} />
          <Watchlist onClickFunc={postToWatchlist} />
        </ButtonContainer>
      )}
    </Container>
  );
};

export default AnimeCard;

const Wrapper = styled.div`
  /* position: relative; */
  & :hover {
    transition: all 0.4s;
    cursor: pointer;
    transform: translateY(-0.8rem);
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
  }
`;

const StyledAnimeCard = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  /* border: 1px solid green; */
  width: 250px;
  /* height: 215px; */

  filter: grayscale(${(props) => (props.filter ? `${100}` : 0)});
  /* filter: grayscale(100%); */
  & :hover {
    transform: scale(1.05);
    cursor: pointer;
    /* transform: translateY(-0.8rem);
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3); */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  color: var(--primary);
  gap: 0.5rem;
`;

const Container = styled.div`
  position: relative;
`;

const StyledFavouriteButton = styled.div`
  width: 300px;
  /* margin: 50px auto; */
  background: #00bfb6;
  padding: 20px;
  text-align: center;
  font-weight: 900;
  color: #fff;
  font-family: arial;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid #00bfb6;
    border-right: 10px solid transparent;
    border-top: 10px solid #00bfb6;
    border-bottom: 10px solid transparent;
    left: 19px;
    bottom: -19px;
  }
`;

const StyledHistoryButtonContainer = styled.div`
  /* width: 300px; */
  /* margin: 50px auto; */
  background: #00bfb6;
  padding: 20px;
  text-align: center;
  font-weight: 900;
  color: #fff;
  font-family: arial;
  position: relative;
  z-index: 1;
  left: 0px;
  bottom: -100px;

  &::before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid #00bfb6;
    border-right: 10px solid transparent;
    border-top: 10px solid #00bfb6;
    border-bottom: 10px solid transparent;
    left: 19px;
    bottom: -19px;
  }
`;
