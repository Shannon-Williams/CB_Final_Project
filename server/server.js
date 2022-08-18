const express = require("express");
const app = express();
const port = 8000;

app.get("/api/test", (req, res) => {
  console.log("I am being called");
  res.status(200).json({ message: "Hello World! From Server" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
