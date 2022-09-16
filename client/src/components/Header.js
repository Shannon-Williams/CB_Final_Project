import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({}) => {
  const { user } = useAuth0();
  return (
    <Wrapper>
      <Link style={{ textDecoration: "none" }} to={`/`}>
        <Logo>Final Project</Logo>
      </Link>
      <ProfileContainer>
        {user && (
          <ProfileLink>
            <StyledLink style={{ textDecoration: "none" }} to={`/profile`}>
              Profile
            </StyledLink>
          </ProfileLink>
        )}
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
  /* border: 1px black solid; */
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  color: var(--white);
  background-color: var(--black);
  /* background-color: rgba(0, 0, 0, 0.4); */
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 1; */
  transition: all 7ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const Logo = styled.div`
  color: white;
`;

const StyledLink = styled(Link)`
  a {
    color: white;
  }

  a:visited {
    color: white;
  }
`;

const ProfileLink = styled.div`
  & > a {
    color: white;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProfileButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
