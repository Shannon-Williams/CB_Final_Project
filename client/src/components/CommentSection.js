import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import styled from "styled-components";

const CommentSection = ({ comments }) => {
  const [open, setOpen] = useState(false);
  let { user } = useAuth0();

  return (
    <div>
      <CommentTitle
        onClick={() => {
          setOpen(!open);
        }}
      >
        Reviews
      </CommentTitle>
      {open &&
        comments.map((comment, index) => {
          return (
            <UserCommentContainer>
              <ImagePlaceHolder></ImagePlaceHolder>
              <UserComment>
                <Username>{user?.given_name}</Username>
                <CommentText key={index}>{comment?.comment}</CommentText>
              </UserComment>
            </UserCommentContainer>
          );
        })}
    </div>
  );
};

export default CommentSection;

const CommentText = styled.div`
  font-size: 1.25rem;
`;

const CommentTitle = styled.h2`
  font-size: 1.25rem;
  margin: 1.75rem 0 1rem 0;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const ImagePlaceHolder = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: gray;
`;

const UserCommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const UserComment = styled.div``;

const Username = styled.span``;