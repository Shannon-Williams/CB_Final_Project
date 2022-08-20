import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("No message");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <BrowserRouter>
      <div>Hello World from client, My Message {message}</div>;
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
