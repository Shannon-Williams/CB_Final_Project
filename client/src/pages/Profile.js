import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import AnimeList from "../components/AnimeList";
import ProfileTabs from "../components/ProfileTabs";
import styled from "styled-components";
import homepageBg from "../assets/biganime.png";

const Profile = ({}) => {
  const { user, isLoading } = useAuth0();
  const [favouriteList, setFavouriteList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      fetchFavourtieProfile();
      fetchWatchlistProfile();
      fetchHistoryProfile();
      setLoading(false);
    }
  }, [user, profileTypeId]);

  return !loading ? (
    <Wrapper>
      {/* My Profile Page for {user?.given_name} */}
      <ProfileTabs />
      <ListContainer>
        {profileTypeId === "favourites" && (
          <AnimeList
            animeList={favouriteList}
            profileTypeId={profileTypeId}
            grayscale={true}
          />
        )}
        {profileTypeId === "history" && (
          <AnimeList animeList={historyList} grayscale={true} />
        )}
        {profileTypeId === "watchlist" && (
          <AnimeList animeList={watchlist} grayscale={true} />
        )}
      </ListContainer>
      {/* <Outlet /> */}
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1)),
    url(${homepageBg});
  background-position: center;
  background-repeat: no-repeat;
  background-repeat: repeat;
  background-size: cover;
  position: relative; */
  /* height: 100%; */
`;

const ListContainer = styled.div`
  /* border: 1px solid black; */
`;
