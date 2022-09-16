import { Image } from "./styled/AnimeCard.styled";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import HistoryButton from "./HistoryButton";
import Watchlist from "./WatchlistButton";
import RemoveButton from "./RemoveButton";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useState } from "react";

const AnimeCard = ({
  anime,
  profileTypeId,
  grayscale,
  fetchFavourtieProfile,
  fetchAllLists,
}) => {
  const { user } = useAuth0();
  const [filter, setFilter] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasBeenRemoved, setHasBeenRemoved] = useState(false);

  console.log(`animecard`, grayscale);

  const refreshPage = () => {
    navigate(0);
  };
  console.log(useParams());
  let profileId = useParams().profileTypeId;
  profileTypeId = profileTypeId ? profileTypeId : profileId;

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
    setLoading(true);
    setHasBeenRemoved(true);
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
      fetchAllLists();
    } else {
      setLoading(true);
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
      fetchAllLists();
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
      <Wrapper hasBeenRemoved={hasBeenRemoved}>
        <Link style={{ textDecoration: "none" }} to={`/anime/${anime.mal_id}`}>
          <StyledAnimeCard
            filter={filter ? 1 : 0}
            onMouseEnter={() => {
              console.log(filter);
              setFilter(false);
            }}
            onMouseLeave={() => {
              setFilter(true);
            }}
          >
            <Images src={`${anime?.images?.jpg?.large_image_url}`} />
          </StyledAnimeCard>
        </Link>
      </Wrapper>
      {user && (
        <ButtonContainer
          onMouseEnter={() => {
            console.log(filter);
            setFilter(false);
          }}
          onMouseLeave={() => {
            setFilter(true);
          }}
          filter={filter ? 1 : 0}
        >
          {profileTypeId && <RemoveButton onClickFunc={updateUserLists} />}
          <FavouriteButton onClickFunc={postToFavourties} />
          <HistoryButton onClickFunc={postToHistory} />
          <Watchlist onClickFunc={postToWatchlist} />
        </ButtonContainer>
      )}
    </Container>
  );
};

export default AnimeCard;

const TestLoading = styled.div`
  width: 500px;
  height: 200px;
  background-color: blueviolet;
`;

const Wrapper = styled.div`
  display: ${(props) => (props.hasBeenRemoved ? "none" : "inital")};

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
  width: 250px;
  border: 3px solid var(--white);
  outline-offset: 1px;
  outline: 3px solid var(--black);

  filter: grayscale(${(props) => (props.filter ? `${100}` : 0)});
  & :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: ${(props) => (props.filter ? "none" : "flex")};
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
const Images = styled.img``;
