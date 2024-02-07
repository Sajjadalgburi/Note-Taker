const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const api = require("./routes/main");

// Middleware for static assets
app.use(express.static("public"));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// created a costume route for GET and POST /notes
app.use("/api", api);

// Define html route for notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Define main root route for return homepage.html
app.get("/", (req, res) => {
  console.info(`${req.method} request received for homepage`);

  res.sendFile(path.join(__dirname, "public/homepage.html"));
});

// Wildcard route to direct users to a 404 page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/404.html"))
);

// calling the server through listen method
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
