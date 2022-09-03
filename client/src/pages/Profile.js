import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Profile = ({}) => {
  const { user, isLoading } = useAuth0();

  const fetchFavourtieProfile = async () => {
    const res = await fetch(`/api/favourite/${user?.sub}`);
    const { data } = await res.json();
    console.log(`Profile:favourite`, data);
    return data;
  };

  const fetchWatchlistProfile = async () => {
    const res = await fetch(`/api/watchlist/${user?.sub}`);
    const { data } = await res.json();
    console.log(`Profile:watchlist`, data);
    return data;
  };

  const fetchHistoryProfile = async () => {
    const res = await fetch(`/api/history/${user?.sub}`);
    const { data } = await res.json();
    console.log(`Profile:watchlist`, data);
    return data;
  };

  useEffect(() => {
    fetchFavourtieProfile();
    fetchWatchlistProfile();
  }, []);

  return (
    <div>
      My Profile Page for {user?.given_name}
      <Outlet />
    </div>
  );
};

export default Profile;
