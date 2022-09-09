import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import CommentPost from "../components/CommentPost";
import AnimeRating from "../components/AnimeRating";
import styled from "styled-components";
import { Image } from "../components/styled/AnimeCard.styled";
import YoutubeEmbed from "../components/YoutubeEmbed";
import Lists from "../components/Lists";
const AnimeDetails = () => {
  const { id } = useParams();
  const [commentFeed, setCommentFeed] = useState();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(`param is`, id);

  const fetchAnimeFullDetails = async () => {
    setLoading(true);
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

  return (
    <Wrapper>
      <AnimeTitle>{animeDetails?.title}</AnimeTitle>
      <AnimeOverviewContainer>
        <Image src={`${animeDetails?.images?.jpg?.large_image_url}`} />
        <Overview>
          <Details>
            <span>Rating: {animeDetails?.rating}</span>
            <span>Aired: {animeDetails?.aired.string}</span>
            <span>Episodes: {animeDetails?.episodes}</span>
            <span>
              Genre(s): <Lists list={animeDetails?.genres} />
            </span>
            <span>
              Streaming:
              <Lists list={animeDetails?.streaming} />
            </span>
            <span>{}</span>
          </Details>
          <EmbeddedVideo embedUrl={animeDetails?.trailer.embed_url} />
          <AnimeRating animeId={id} />
          <CommentPost animeId={id} fetchCommentSection={fetchCommentSection} />
        </Overview>
      </AnimeOverviewContainer>
      <P>{animeDetails?.synopsis}</P>

      {commentFeed && <CommentSection comments={commentFeed} />}
    </Wrapper>
  );
};

export default AnimeDetails;

const Wrapper = styled.div`
  border: 1px solid blue;
  width: 1000px;
`;

const AnimeTitle = styled.h1`
  margin: 1.5rem 0;
  font-size: 2rem;
`;

const P = styled.p``;

const AnimeOverviewContainer = styled.div`
  display: flex;
`;
const Overview = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmbeddedVideo = styled(YoutubeEmbed)`
  /* margin-top: 2rem; */
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;
