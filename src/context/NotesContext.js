import { useEffect, useState } from "react";
import { createContext } from "react";
import { initialNotes } from "../utils/constants";
import { nanoid } from "nanoid";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const updateFilteredNotes = () => {
      const foundNotes = notes.filter(
        (note) =>
          note.body === searchValue ||
          note.body.includes(searchValue) ||
          note.title === searchValue ||
          note.title.includes(searchValue) ||
          note.createdAt === searchValue ||
          note.createdAt.includes(searchValue)
      );

      setFilteredNotes(foundNotes);
    };

    updateFilteredNotes();

  }, [notes, searchValue]);

  useEffect(() => {
    const getSavedNotesFromLocalStorage = () => {
      const ls = localStorage;
      const savedNotes = ls.getItem("notes");
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      }
    };

    getSavedNotesFromLocalStorage();

  }, []);

  useEffect(() => {
    const setNotesInLocalStorage = () => {
      const ls = localStorage;
      const stringifiedNotes = JSON.stringify(notes);
      ls.setItem("notes", stringifiedNotes);
    };

    setNotesInLocalStorage();
    
  }, [notes]);

  const searchValueOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddNote = () => {
    const d = new Date();

    const newNote = {
      id: nanoid(),
      title: `New note`,
      body: "",
      createdAt: `${d.toLocaleDateString("es-VE")}`,
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
