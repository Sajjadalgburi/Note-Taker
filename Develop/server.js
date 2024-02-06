const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const api = require("./routes/index.js");

// Middleware for static assets
app.use(express.static("public"));

// Define html route for notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Define catch-all route to return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/homepage.html"));
});

// calling the server through listen method
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
