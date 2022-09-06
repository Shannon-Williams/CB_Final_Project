import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const AnimeRating = ({}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    console.log(`rating`, rating);
  }, [rating]);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        // console.log(ratingValue, index);
        return (
          <label key={index} onClick={() => setRating(ratingValue)}>
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
