// import { json } from "react-router-dom";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = 'http://localhost:5000'
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  const getNote = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  //ADD note
  const addNote =async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
      },
      body: JSON.stringify({ title, description, tag })
    });
  const note=await response.json()
  setNotes(notes.concat(note))
    }
   
  

  //edit note
  let newNotes=JSON.parse(JSON.stringify(notes))
  const editNote = async (id, title, description, tag) => {

     await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
      },
      body: JSON.stringify({ title, description, tag })
    });

    for (let i = 0; i < notes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;

        break;
      }    
    }
    setNotes(newNotes)
  }

  //delete Note
  const deleteNote = async(id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
      },
      // body: JSON.stringify({ title, description, tag })
    });
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  return (
    <NoteContext.Provider key={notes._id} value={{ notes, addNote, editNote, deleteNote ,getNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;