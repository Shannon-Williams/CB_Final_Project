import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = ({}) => {
  const { user } = useAuth0();

  const postData = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response.json();
  };

  return (
    <div>
      your are logged in
      {JSON.stringify(user)}
    </div>
  );
};

export default LoginPage;
