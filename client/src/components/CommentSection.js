const CommentSection = ({ comments }) => {
  return comments.map((comment, index) => {
    return <div key={index}>{comment?.comment}</div>;
  });
};

export default CommentSection;
