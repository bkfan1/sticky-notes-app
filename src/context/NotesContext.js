import { useEffect, useState } from "react";
import { createContext } from "react";
import { nanoid } from "nanoid";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {

  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([])


  useEffect(()=>{
    const foundNotes = notes.filter((note)=>((note.body === searchValue || note.body.includes(searchValue)) || (note.title === searchValue || note.title.includes(searchValue)) || (note.createdAt === searchValue || note.createdAt.includes(searchValue))));

    setFilteredNotes(foundNotes)


  }, [notes,searchValue])

  const searchValueOnChange = (e)=>{
    setSearchValue(e.target.value);
  }

  useEffect(()=>{
    const ls = localStorage;
    const savedNotes = ls.getItem('notes');
    if(savedNotes){
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
    }

  }, []);

  useEffect(()=>{
    const ls = localStorage;
    const stringifiedNotes = JSON.stringify(notes);
    ls.setItem('notes',stringifiedNotes);
  }, [notes]);
 

  const handleAddNote = () => {

    if(searchValue.length > 0){setSearchValue("")}

    const d = new Date();

    const newNote = {
      id: nanoid(),
      title: `New note`,
      body: "",
      createdAt: `${d.toLocaleDateString('es-VE')}`
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    
  };

  const handleChangeNoteData = (e, noteId) => {
    const { target } = e;
    const { name, value } = target;

    const noteIndex = notes.findIndex((note) => note.id === noteId);
    let currentNote = Object.assign({}, notes[noteIndex]);
    currentNote[name] = value;

    const newNotes = [...notes];
    newNotes.splice(noteIndex, 1, currentNote);
    setNotes(newNotes);
  };

  const handleDeleteNote = (noteId) => {
    const index = notes.findIndex((note) => note.id === noteId);
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        filteredNotes,

        handleAddNote,
        handleChangeNoteData,
        handleDeleteNote,

        searchValue,
        setSearchValue,
        searchValueOnChange,

      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
