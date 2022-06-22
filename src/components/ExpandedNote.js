import { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ExpandedNote({ id, noteData, handleClickModalBtn }) {
  const { handleChangeNoteData, handleDeleteNote } = useContext(NotesContext);

  const [viewAsMarkDown, setViewAsMarkDown] = useState(false);

  const handleDeleteExpandedNote = (e, id) => {
    handleClickModalBtn();
    handleDeleteNote(e, id);
  };

  return (
    <>
      <figure className={`flex flex-col justify-between w-96 bg-slate-500`}>
        <header className="flex justify-between items-center w-full bg-slate-700 border-t-8 border-slate-800 px-2 py-1">
          <button
            onClick={() => setViewAsMarkDown(!viewAsMarkDown)}
            title={`${
              viewAsMarkDown ? "View as plain text" : "View as Markdown"
            }`}
          >
            <i
              className={`${
                viewAsMarkDown ? "bi bi-fonts" : "bi bi-markdown"
              } text-xl text-white`}
            />
          </button>

          <input
            onChange={(e) => handleChangeNoteData(e, id)}
            className="text-white text-center font-bold bg-transparent"
            type="text"
            name="title"
            placeholder="Add a title... "
            defaultValue={noteData.title}
          />
          <button
            onClick={handleClickModalBtn}
            title="Contract"
            className="text-white"
          >
            <i className="bi bi-arrows-angle-contract" />
          </button>
        </header>

        {viewAsMarkDown ? (
          <ReactMarkdown
            children={noteData.body}
            remarkPlugins={[remarkGfm]}
            className="prose h-96 p-3 overflow-y-scroll prose-stone bg-white"
          />
        ) : (
          <section className="h-96 p-2">
            <textarea
              onChange={(e) => handleChangeNoteData(e, id)}
              className="singleNote__textArea ease-in-out duration-150 w-full h-full text-sm text-white outline-none outline-0 rounded bg-transparent p-1 focus:bg-slate-600 focus:outline-2 outline-slate-300"
              name="body"
              defaultValue={noteData.body}
              placeholder="Type something..."
            ></textarea>
          </section>
        )}

        <section className="flex justify-between text-white p-2">
          <button
            title="Delete note"
            onClick={(e) => handleDeleteExpandedNote(e, id)}
          >
            <i className="bi bi-trash" />
          </button>
          <p title="Date of creation" className="font-bold">
            {noteData.createdAt}
            <i className="bi bi-calendar-fill ml-1" />
          </p>
        </section>
      </figure>
    </>
  );
}
