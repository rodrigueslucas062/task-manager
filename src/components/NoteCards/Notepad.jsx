import { useEffect, useState } from "react";
import NewNoteCards from "./NewNoteCards";
import NoteCards from "./NoteCards";
import { Search } from "lucide-react";


const NotepadCards = () => {
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState([])
    const shadowStyle = { boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.75)" };

    useEffect(() => {
        const notesOnStorage = localStorage.getItem('notes')
        if (notesOnStorage) {
            setNotes(JSON.parse(notesOnStorage))
        }
    }, [])

    function onNoteCreated(string) {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content: string,
        }
        const notesArray = [newNote, ...notes]
        setNotes(notesArray)
        localStorage.setItem('notes', JSON.stringify(notesArray))
    }

    function handleSearch(event) {
        const query = event.target.value

        setSearch(query)
    }

    function handleDeleteNote(id) {
        const notesArray = notes.filter(note => {
            return note.id !== id
        })
        setNotes(notesArray)
        localStorage.setItem('notes', JSON.stringify(notesArray))
    }

    const filteredNotes = search !== ''
        ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        : notes

    return (
        <section className="zig-zag min-h-screen min-w-screen">
            <div className="mx-auto max-w-6xl space-y-6 px-5">
                <form className="w-full pt-32">
                    <div className="relative rounded-lg inline-block w-full bg-white border-4 border-zinc-900 text-zinc-900" style={shadowStyle}>
                        <input
                            type="text"
                            placeholder="Busque em suas notas..."
                            className="block w-full focus:outline-none rounded-xl border-0 py-3 text-gray-900 bg-white placeholder:text-gray-400 pl-10"
                            onChange={handleSearch} />
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                    <NewNoteCards onNoteCreated={onNoteCreated} />

                    {filteredNotes.map(note => {
                        return <NoteCards key={note.id} date={note.date} content={note.content} handleDeleteNote={() => handleDeleteNote(note.id)} />
                    })}
                </div>
            </div>
        </section>
    );
};

export default NotepadCards;
