import styled from "styled-components";

const LoadingScreen = () => {
  return <LoadingContainer>Loading...</LoadingContainer>;
};

export default LoadingScreen;

const LoadingContainer = styled.div`
  background-color: yellow;
  width: 100%;
  height: 100vh;
  /* height: 345px; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
