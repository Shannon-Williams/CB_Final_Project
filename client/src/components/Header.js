import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Header = ({}) => {
  return (
    <Wrapper>
      <Link style={{ textDecoration: "none" }} to={`/`}>
        <Logo>Header</Logo>
      </Link>
      <ProfileContainer>
        <ProfileButtonsContainer>
          <LoginButton />
          <LogoutButton />
        </ProfileButtonsContainer>
      </ProfileContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  border: 1px black solid;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div``;

const ProfileContainer = styled.div``;

const ProfileButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
