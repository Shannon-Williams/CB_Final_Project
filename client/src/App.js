import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [message, setMessage] = useState("No message");
  const { user } = useAuth0();

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <BrowserRouter>
      <div>Hello World from client, My Message {message}</div>
      <LoginButton />
      <LogoutButton />
      <Routes>
        <Route path="/" element={<div>HomePage</div>} />
        <Route
          path="/profile"
          element={
            <div>
              Profile Page <Outlet />
            </div>
          }
        >
          <Route path=":profileTypeId" element={<div>Your Anime Lists</div>} />
        </Route>
        <Route path="/anime/:id" element={<div>Anime Details</div>} />
        <Route path="/signin" element={<div>sign in page</div>} />
        <Route path="/signout" element={<div>sign out page</div>} />
        <Route path="*" element={<div>404 Error</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
