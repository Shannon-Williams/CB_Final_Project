import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AnimeDetails = () => {
  const { id } = useParams();

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

  useEffect(() => {
    fetchAnimeFullDetails();
  }, [id]);

  return <div>ANime Details</div>;
};

export default AnimeDetails;
