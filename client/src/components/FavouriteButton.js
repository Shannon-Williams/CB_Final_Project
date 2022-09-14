import { MdFavorite } from "react-icons/md";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
const FavouriteButton = ({ onClickFunc }) => {
  return (
    // <Tippy content="Add to Favourties" visible={true}>
    <StyledButton onClick={onClickFunc} size={20}>
      {/* <button onClick={onClickFunc} />; */}
    </StyledButton>
    // </Tippy>
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

const StyledTippy = styled(Tippy)`
  position: relative;
`;
