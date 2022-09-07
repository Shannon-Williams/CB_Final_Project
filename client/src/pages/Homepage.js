import Searchbar from "../components/Searchbar";
import styled from "styled-components";

const Homepage = ({}) => {
  return (
    <Wrapper>
      <Searchbar />
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  border: 1px blue solid;
  width: 100%;
`;
