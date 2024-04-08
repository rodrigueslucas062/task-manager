import Navbar from "@/components/Navbar";
import NewNoteCards from "@/components/NoteCards/NewNoteCard";
import NoteCards from "@/components/NoteCards/NoteCards";
import { useEffect, useState } from "react";

const Main = () => {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      setNotes(JSON.parse(notesOnStorage));
    }
  }, []);

  function onNoteCreated(string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: string,
    };
    const notesArray = [newNote, ...notes];
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function handleSearch(event) {
    const query = event.target.value;

    setSearch(query);
  }

  function handleDeleteNote(id) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <Navbar />
      {/* <Image src={Logo} width={100} height={100} alt="Logo image"/> */}

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent font-semibold tracking-tighter outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCards onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return (
            <NoteCards
              key={note.id}
              date={note.date}
              content={note.content}
              handleDeleteNote={() => handleDeleteNote(note.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Main;
