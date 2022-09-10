import { Outlet, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import AnimeList from "../components/AnimeList";
import ProfileTabs from "../components/ProfileTabs";
import styled from "styled-components";

const Profile = ({}) => {
  const { user, isLoading } = useAuth0();
  const [favouriteList, setFavouriteList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  let { profileTypeId } = useParams();

  useEffect(() => {
    console.log(`params are`, profileTypeId);
  }, [profileTypeId]);

  const fetchFavourtieProfile = async () => {
    const res = await fetch(`/api/favourite/${user?.sub}`);
    const { data } = await res.json();
    console.log(`Profile:favourite`, data);
    setFavouriteList(data);
    return data;
  };

  const fetchWatchlistProfile = async () => {
    const res = await fetch(`/api/watchlist/${user?.sub}`);
    const { data } = await res.json();
    console.log(`Profile:watchlist`, data);
    setWatchlist(data);
    return data;
  };

  const fetchHistoryProfile = async () => {
    const res = await fetch(`/api/history/${user?.sub}`);
    const { data } = await res.json();
    console.log(`Profile:History`, data);
    setHistoryList(data);
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchFavourtieProfile();
      fetchWatchlistProfile();
      fetchHistoryProfile();
    }
  }, [user, profileTypeId]);

  return (
    <Wrapper>
      My Profile Page for {user?.given_name}
      <ProfileTabs />
      <ListContainer>
        {profileTypeId === "favs" && <AnimeList animeList={favouriteList} />}
        {profileTypeId === "history" && <AnimeList animeList={historyList} />}
        {profileTypeId === "watchlist" && <AnimeList animeList={watchlist} />}
      </ListContainer>
      <Outlet />
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
  border: 1px solid black;
`;
