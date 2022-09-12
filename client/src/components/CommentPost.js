import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./styled/elements/Button";

const CommentPost = ({ animeId, fetchCommentSection }) => {
  let { user } = useAuth0();
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(comment);
    console.log(animeId);
  }, [comment]);

  const postComment = async () => {
    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.sub,
        anime_id: animeId,
        comment: comment,
      }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment();
    fetchCommentSection(animeId);
    console.log(`posted Comment =`, comment);
    setComment("");
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h3>Write Comment Here</h3>
      <CommentContainer>
        <CommentInput
          placeholder="What did you think?"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        ></CommentInput>
        <CommentButton type="Submit">Submit</CommentButton>
      </CommentContainer>
    </form>
  );
};

export default CommentPost;

const CommentInput = styled.textarea`
  height: 75px;
  width: 80%;
  padding: 0.5rem 0 0 1rem;
  resize: none;
  border: none;
  background-color: var(--white);

  &:focus {
    outline: none;
  }
`;

const CommentButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border-radius: 10px;
`;

const CommentContainer = styled.div`
  position: relative;
  border: 1px solid gray;
`;
