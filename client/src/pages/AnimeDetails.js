import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import CommentPost from "../components/CommentPost";
import AnimeRating from "../components/AnimeRating";

const AnimeDetails = () => {
  const { id } = useParams();
  const [commentFeed, setCommentFeed] = useState();
  const [loading, setLoading] = useState(false);

  console.log(`param is`, id);

  const fetchAnimeFullDetails = async () => {
    setLoading(true);
    const res = await fetch(`/api/anime/id/${id}`);
    const { data } = await res.json();
    console.log(`anime details data`, data);
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
  }, [id]);

  return (
    <>
      Anime Details
      <AnimeRating />
      <CommentPost animeId={id} fetchCommentSection={fetchCommentSection} />
      {commentFeed && <CommentSection comments={commentFeed} />}
    </>
  );
};

export default AnimeDetails;
