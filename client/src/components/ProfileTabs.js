import { NavLink } from "react-router-dom";
import styled from "styled-components";

const profileTabsData = [
  {
    title: "Favourites",
    path: "favourites",
  },
  {
    title: "Watchlist",
    path: "watchlist",
  },
  {
    title: "History",
    path: "history",
  },
];

const ProfileTabs = ({}) => {
  return (
    <Wrapper>
      <UnorderedList>
        {profileTabsData.map((tabs, index) => {
          return (
            <StyledNavLink
              key={`${tabs.title}-${index}`}
              style={{ textDecoration: "none" }}
              to={`/profile/${tabs.path}`}
              // activeClassName={`${
              //   tabs.title === "Tweets" ? "is-active " : null
              // }`}
              // exact={true}
              // reloadDocument
            >
              <ListItem>{tabs.title}</ListItem>
            </StyledNavLink>
          );
        })}
      </UnorderedList>
    </Wrapper>
  );
};

export default ProfileTabs;

const Wrapper = styled.div`
  /* margin-bottom: 2rem; */
  width: 500px;
  /* border: 1px solid green; */
`;

const StyledNavLink = styled(NavLink)`
  width: 100%;
`;

const ListItem = styled.li`
  list-style: none;
  color: black;
  text-decoration: none;
  padding-bottom: 1rem;
  /* border-bottom: 1px solid var(--red); */
  font-size: 1.25rem;
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  color: var(--primary);
  font-weight: bold;
`;
const UnorderedList = styled.ul`
  display: flex;

  .is-active > li {
    border-bottom: 2px solid blue;
  }
`;
