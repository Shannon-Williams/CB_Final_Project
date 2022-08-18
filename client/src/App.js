import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("No message");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return <div>Hello World from client, My Message {message}</div>;
}

export default App;
