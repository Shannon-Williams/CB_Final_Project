import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import GlobalStyles from "./components/styled/GlobalStyles";
import Layout from "./components/styled/Layout";
import LoginPage from "./components/LoginPage";
import Homepage from "./pages/Homepage";
import AnimeDetails from "./pages/AnimeDetails";

function App() {
  const [message, setMessage] = useState("No message");
  const { user, getAccessTokenSilently } = useAuth0();

  // useEffect(() => {
  //   console.log(user);
  //   getAccessTokenSilently().then((data) => console.log(data));
  // }, [user]);

  // useEffect(() => {
  //   fetch("/api/test")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  // const callAPI = () => {
  //   fetch("/api/test/protected2")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => err.message);
  // };

  // const callProtectedAPI = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const response = await fetch("/api/test/protected", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const result = await response.json();
  //     console.log(response);
  //     console.log(result);
  //     //
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        {/* <div>Hello World from client, My Message {message}</div> */}
        {/* <button onClick={callAPI}>Call API</button>
      <button onClick={callProtectedAPI}>Call Protected API</button> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/profile"
            element={
              <div>
                Profile Page <Outlet />
              </div>
            }
          >
            <Route
              path=":profileTypeId"
              element={<div>Your Anime Lists</div>}
            />
          </Route>
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/signin" element={<div>sign in page</div>} />
          <Route path="/signout" element={<div>sign out page</div>} />
          <Route path="/loggedin" element={<LoginPage />} />
          <Route path="*" element={<div>404 Error</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
