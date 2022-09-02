import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Profile = ({}) => {
  const { user, isLoading } = useAuth0();

  const fetchUserProfile = async () => {
    const res = await fetch(`/api/favourite/${user?.sub}`);
    const { data } = await res.json();
    console.log(`Profile`, data);
    return data;
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      My Profile Page for {user?.given_name}
      <Outlet />
    </div>
  );
};

export default Profile;
