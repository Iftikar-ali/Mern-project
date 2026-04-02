import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notecard from './NoteCard';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get("http://localhost:3000/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCreate = () => {
    axios.post("http://localhost:3000/notes", newNote)
      .then((res) => {
        setNotes([...notes, res.data]);
        setNewNote({ title: "", content: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='container'>
      <h1>Notes App</h1>
      <input
        type="text"
        placeholder='Title'
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <button onClick={handleCreate}>Add Note</button>
      {notes.map((note) => (
        <Notecard key={note._id} note={note} onDelete={() => handleDelete(note._id)} />
      ))}
    </div>
  );
};

export default App;
