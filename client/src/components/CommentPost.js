import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
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
    console.log(`posted Comment =`, comment);
    setComment("");
    fetchCommentSection(animeId);
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      Write Comment Here
      <div>
        <textarea
          placeholder="What did you think?"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        ></textarea>
        <Button type="Submit">Submit</Button>
      </div>
    </form>
  );
};

export default CommentPost;
