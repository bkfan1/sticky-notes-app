import NotesApp from "./components/NotesApp";
import SingleNote from "./components/SingleNote";
import { NotesProvider } from "./context/NotesContext";

function App() {
  
  return (
    <>
      <div className="App">
        <NotesProvider>
          <NotesApp />
        </NotesProvider>
      </div>
    </>
  );
}

export default App;
