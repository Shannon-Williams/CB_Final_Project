import styled from "styled-components";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <MainContent>{children}</MainContent>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  border: 1px blue solid;
  height: 100vh;
`;
