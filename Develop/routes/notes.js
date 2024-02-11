const path = require("path");
const notes = require("express").Router();
const uuid = require("../helpers/uuid");

// Helper functions for reading and writing to the JSON file
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");

// Define the path to db.json
const dbFilePath = path.join(__dirname, "../db/db.json");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile(dbFilePath).then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a new note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, dbFilePath);
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

// GET Route for a specific tip
notes.get("/:note_id", (req, res) => {
  const id = req.params.note_id;
  readFromFile(dbFilePath)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id !== id);
      return result.length > 0
        ? res.json(result)
        : res.json("No tip with that ID");
    });
});

notes.delete("/:note_id", (req, res) => {
  const id = req.params.note_id;

  readFromFile(dbFilePath)
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== id);

      // Save that array to the filesystem
      writeToFile(dbFilePath, result); // Stringify the JSON before writing to file

      // Respond to the DELETE request
      res.json(`Item ${id} has been deleted 🗑️`);
    });
});

module.exports = notes;
