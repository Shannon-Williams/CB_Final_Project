import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Profile = ({}) => {
  const { user, isLoading } = useAuth0();
  const [favouriteList, setFavouriteList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

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
  }, [user]);

  return (
    <div>
      My Profile Page for {user?.given_name}
      <div>
        {favouriteList.map((anime) => {
          return <span key={anime?.mal_id}>{anime?.title}</span>;
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
