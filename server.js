require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/notesapp")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("Mongodb connection error", err));

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", NoteSchema);

app.post('/notes', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    console.log("Note created: ", newNote);
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.put('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Note updated", note);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    console.log("Note Deleted", req.params.id);
    res.json({ message: "Note Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
