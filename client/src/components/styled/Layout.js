const Layout = ({ children }) => {
  return (
    <Wrapper>
      <MainContent>{children}</MainContent>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
`;

const MainContent = styled.div``;
