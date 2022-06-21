import {useContext} from "react";
import {NotesContext} from "../context/NotesContext";

export default function PaginationMenu(){
    const {prevPage, nextPage} = useContext(NotesContext);
    return(
        <>
        <menu className="flex gap-4 py-4">
        <button title="Previous Page" onClick={prevPage}>
            
          <i className="bi bi-caret-left-fill text-2xl text-white" />
        </button>
        <button title="Next page" onClick={nextPage}>
          <i className="bi bi-caret-right-fill text-2xl text-white" />
        </button>
      </menu>
        </>
    )
}