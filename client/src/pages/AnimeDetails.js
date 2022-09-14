import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import CommentPost from "../components/CommentPost";
import AnimeRating from "../components/AnimeRating";
import styled from "styled-components";
import { Image } from "../components/styled/AnimeCard.styled";
import YoutubeEmbed from "../components/YoutubeEmbed";
import Lists from "../components/Lists";
import FavouriteButton from "../components/FavouriteButton";
import HistoryButton from "../components/HistoryButton";
import Watchlist from "../components/WatchlistButton";
import homepageBg from "../assets/biganime.png";
import { useAuth0 } from "@auth0/auth0-react";
import Tippy from "@tippyjs/react";

const AnimeDetails = () => {
  const { id } = useParams();
  const [commentFeed, setCommentFeed] = useState();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  let { user } = useAuth0();

  const postToFavourties = async () => {
    console.log(`Anime is this`, animeDetails);
    const res = await fetch(`/api/favourite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({ id: user.sub, anime: animeDetails }),
    });
  };

  const postToHistory = async () => {
    console.log(`Anime is this`, animeDetails);
    const res = await fetch(`/api/history`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.sub, anime: animeDetails }),
    });
  };

  const postToWatchlist = async () => {
    console.log(`Anime is this`, animeDetails);
    const res = await fetch(`/api/watchlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.sub, anime: animeDetails }),
    });
  };

  console.log(`param is`, id);

  const fetchAnimeFullDetails = async () => {
    // setLoading(true);

    const res = await fetch(`/api/anime/id/${id}`);
    const { data } = await res.json();
    console.log(`anime details data`, data);
    setAnimeDetails(data);
    setLoading(false);
    return data;
  };

  const fetchCommentSection = async (id) => {
    console.log(`fetchCommentSection`, id);
    const res = await fetch(`/api/comments/${id}`);
    const { data } = await res.json();
    console.log(`anime comments data`, data);
    setCommentFeed(data);
    return data;
  };

  useEffect(() => {
    fetchAnimeFullDetails();
    fetchCommentSection(id);
    console.log(animeDetails);
  }, [id]);

  return !loading ? (
    <Wrapper>
      <DetailContainer>
        <AnimeTitle>{animeDetails?.title}</AnimeTitle>

        <AnimeOverviewContainer>
          {animeDetails?.images && (
            <Image src={`${animeDetails.images.jpg.large_image_url}`} />
          )}

          <Overview>
            <Details>
              <span>
                {" "}
                <DetailTitle>Rating:</DetailTitle> {animeDetails?.rating}
              </span>
              <span>
                <DetailTitle>Aired:</DetailTitle> {animeDetails?.aired.string}
              </span>
              <span>
                <DetailTitle>Episodes:</DetailTitle>
                {animeDetails?.episodes}
              </span>
              <span>
                <DetailTitle>Genre(s):</DetailTitle>{" "}
                <Lists list={animeDetails?.genres} />
              </span>
              <span>
                <DetailTitle>Streaming:</DetailTitle>
                <Lists list={animeDetails?.streaming} />
              </span>
              <span>{}</span>
            </Details>
            {animeDetails?.trailer.embed_url && (
              <EmbeddedVideo embedUrl={animeDetails?.trailer.embed_url} />
            )}
            {user && <AnimeRating animeId={id} />}
            <CommentPost
              animeId={id}
              fetchCommentSection={fetchCommentSection}
            />
          </Overview>
        </AnimeOverviewContainer>
        <Summary>
          <Synpopsis>Synpopsis:</Synpopsis>
          <P>{animeDetails?.synopsis}</P>
        </Summary>
        <AngledLine />
        <AngledLine />
        {user && (
          <ButtonContainer>
            <FavouriteButton onClickFunc={postToFavourties} />

            <HistoryButton onClickFunc={postToHistory} />
            <Watchlist onClickFunc={postToWatchlist} />
          </ButtonContainer>
        )}

        {commentFeed && (
          <CommentSection
            comments={commentFeed}
            fetchCommentSection={fetchCommentSection}
          />
        )}
      </DetailContainer>
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
};

export default AnimeDetails;

const Wrapper = styled.div`
  border: 1px solid blue;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),
    url(${homepageBg});
  background-position: center;
  /* background-repeat: no-repeat; */
  background-repeat: repeat;
  background-size: cover;
  /* position: relative; */
`;

const DetailContainer = styled.div`
  width: 1000px;
  margin: 1rem auto;
  /* padding: 1rem; */
  background-color: var(--white);
  border-radius: 10px;
  border: 2px solid var(--black);
  position: relative;
`;

const DetailTitle = styled.span`
  font-weight: bold;
`;

const AnimeTitle = styled.h1`
  margin: 0 0 0.25rem 0;
  padding: 0.5rem 0 0 0;
  font-size: 2rem;
  text-align: center;
  border-bottom: 2px solid var(--black);
`;

const P = styled.p`
  word-wrap: break-word;
  font-size: 0.9rem;
  line-height: 1.2;
`;

const AnimeOverviewContainer = styled.div`
  display: flex;
  /* gap: 0.25rem; */
  justify-content: space-between;
  /* padding: 0 0.25rem; */
`;
const Overview = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  border-top: 2px solid var(--black);
  padding: 1rem;
`;

const EmbeddedVideo = styled(YoutubeEmbed)`
  /* margin-top: 2rem; */
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  gap: 0.25rem;
`;

const Synpopsis = styled.h3`
  /* margin: 0.5rem 0; */
  margin: 0 0 0.25rem 0;
`;
const Summary = styled.div`
  padding: 1rem;
  /* padding: 0 0 1rem 0; */
`;

const AngledLine = styled.div`
  /* height: 50px; */
  width: 100%;
  transform: skew(0deg, 1deg);
  border-bottom: 2px solid var(--black);
  margin: 0 0 0.25rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: -20px;
  color: var(--primary);
  gap: 0.5rem;
`;
