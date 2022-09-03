import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const AnimeDetails = () => {
  const { id } = useParams();
  const [comments, setComments] = useState();

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

  const fetchCommentSection = async () => {
    const res = await fetch(`/api/comments/${id}`);
    const { data } = await res.json();
    console.log(`anime comments data`, data);
    setComments(data);
    return data;
  };

  useEffect(() => {
    fetchAnimeFullDetails();
    fetchCommentSection();
  }, [id]);

  return (
    <>
      Anime Details
      {comments && <CommentSection comments={comments} />}
    </>
  );
};

export default AnimeDetails;
