import styled from "styled-components";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <MainContent>{children}</MainContent>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  border: 1px pink solid;
  /* height: 5vh; */
`;

const MainContent = styled.div`
  border: 1px blue solid;
  /* height: 95vh; */
`;
