import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const AnimeRating = ({ initialRating = 0, animeId }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);
  let { user, isLoading } = useAuth0();

  const fetchAnimeRating = async () => {
    const res = await fetch(
      `/api/rating/?user_id=${user?.sub}&anime_id=${animeId}`
    );

    const data = await res.json();
    console.log(`getRating data`, data);
    setRating(data?.data?.rating);
  };

  const postAnimeRating = async (rating) => {
    const res = await fetch(`/api/rating`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.sub,
        anime_id: animeId,
        rating: rating,
      }),
    });
  };

  useEffect(() => {
    console.log(`animeid`, animeId);
    console.log(`animerating user`, user);

    fetchAnimeRating();
  }, [user]);

  useEffect(() => {
    console.log(`rating`, rating);
  }, [rating]);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        // console.log(ratingValue, index);
        return (
          <label
            key={index}
            onClick={() => {
              setRating(ratingValue);
              postAnimeRating(rating);
            }}
          >
            <StarInput type={"radio"} name={"rating"} value={ratingValue} />
            <FaStar
              size={100}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(null);
              }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default AnimeRating;

const StarInput = styled.input`
  &[type="radio"] {
    display: none;
  }
`;

const Star = styled.label`
  cursor: pointer;
  transition: all 200ms;
`;
