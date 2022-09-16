import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import GlobalStyles from "./components/styled/GlobalStyles";
import Layout from "./components/styled/Layout";
import LoginPage from "./components/LoginPage";
import Homepage from "./pages/Homepage";
import AnimeDetails from "./pages/AnimeDetails";
import Profile from "./pages/Profile";

function App() {
  const { user, getAccessTokenSilently } = useAuth0();

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />}>
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
