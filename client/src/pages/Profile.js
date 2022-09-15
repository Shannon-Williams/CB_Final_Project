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
  const [base64, setBase64] = useState("");

  const handleOnChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
    };
  };

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

  const updateUserProfileBanner = async (endpoint, userId, base64String) => {
    const res = await fetch(`${endpoint}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        profileBanner: base64String,
      }),
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    updateUserProfileBanner(`/api/user`, user?.sub, base64);
    setBase64("");
    console.log(`this probably worked`);
  };

  const getProfileBanner = async () => {
    const res = await fetch(`/api/user/${user?.sub}`);
    const { data } = await res.json();
    setBase64(data);
    return data;
  };

  useEffect(() => {
    if (user) {
      getProfileBanner();
    } else {
      setBase64(null);
    }
  }, [base64]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      if (user) {
        getProfileBanner();
      } else {
        setBase64(null);
      }
      fetchFavourtieProfile();
      fetchWatchlistProfile();
      fetchHistoryProfile();
      setLoading(false);
    }
  }, [user, profileTypeId]);

  return !loading ? (
    <Wrapper>
      <ProfileBannerContainer>
        <ProfileBannerImage src={base64} />
        <form onSubmit={handleSumbit}>
          {!base64 && (
            <>
              <input type={"file"} onChange={handleOnChange} />
              <ProfileSubmitButton type="submit">Submit</ProfileSubmitButton>
            </>
          )}
        </form>
      </ProfileBannerContainer>
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

const ProfileSubmitButton = styled.button`
  color: black;
  background-color: whitesmoke;
`;

const ProfileBannerImage = styled.img``;

const ProfileBannerContainer = styled.div``;
