import { MdFavorite } from "react-icons/md";
import styled from "styled-components";
const FavouriteButton = ({ onClickFunc }) => {
  return (
    <StyledButton onClick={onClickFunc} size={20}>
      {/* <button onClick={onClickFunc} />; */}
    </StyledButton>
  );
};

export default FavouriteButton;

const StyledButton = styled(MdFavorite)`
  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.9);
  }
`;
