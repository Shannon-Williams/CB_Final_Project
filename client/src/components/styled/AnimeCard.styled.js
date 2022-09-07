import styled from "styled-components";

const StyledAnimeCard = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  /* border: 1px solid green; */
  width: 250px;
  /* height: 215px; */

  & :hover {
    cursor: pointer;
  }
`;

export const Image = styled.img`
  /* height: 50%; */
  /* width: 50%; */
`;

export default StyledAnimeCard;
