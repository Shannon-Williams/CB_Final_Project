import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import Button from "./styled/elements/Button";

const CommentPost = ({ animeId, fetchCommentSection }) => {
  let { user } = useAuth0();
  const [comment, setComment] = useState("");
  const [characterCount, setCharacterCount] = useState(250);
  const MAX_CHARACTER_LENGTH = 250;

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
        nickname: user.nickname,
        picture: user.picture,
        anime_id: animeId,
        comment: comment,
      }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (characterCount < 0 || comment.length < 1) {
      return;
    } else {
      postComment();
      fetchCommentSection(animeId);
      console.log(`posted Comment =`, comment);
      setComment("");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <CommentContainer>
        <CommentInput
          placeholder="What did you think?"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <SubmitContainer>
          <CharacterCount
            characterCount={MAX_CHARACTER_LENGTH - comment.length}
          >
            {MAX_CHARACTER_LENGTH - comment.length}
          </CharacterCount>
          <CommentButton type="Submit">Submit</CommentButton>
        </SubmitContainer>
      </CommentContainer>
    </form>
  );
};

export default CommentPost;

const CommentInput = styled.textarea`
  height: 75px;
  width: 80%;
  padding: 0.25rem 0 0 1rem;
  resize: none;
  border: none;
  background-color: var(--white);

  &:focus {
    outline: none;
  }
`;

const CommentButton = styled.button`
  /* position: absolute; */
  /* bottom: 0;
  right: 0; */
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid var(--black);

  &:hover {
    background-color: var(--black);
    color: white;
    font-weight: bold;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  /* position: relative; */
  border: 1px solid var(--black);
  border-radius: 7px;
`;

const CharacterCount = styled.span`
  color: ${(props) =>
    props.characterCount < 55
      ? props.characterCount < 0
        ? "var(--red)"
        : "var(--dark-blue)"
      : "var(--black)"};
  /* font-size: 0.8rem; */
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* gap: 0.25rem; */
  margin: 0 0 0.25rem 0;
`;
