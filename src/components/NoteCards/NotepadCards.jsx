import { useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { NewNoteCards, NoteCards } from "@/components";

export const NotepadCards = () => {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?.uid) return;
      const notesRef = collection(db, `users/${user.uid}/notas`);
      const notesQuery = query(notesRef);
      const querySnapshot = await getDocs(notesQuery);

      const notesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
    };

    fetchNotes();
  }, [user?.uid]);

  const onNoteCreated = async (content) => {
    if (!content.trim() || !user?.uid) return;

    const newNote = {
      date: new Date().toISOString(),
      content: content.trim(),
      userId: user.uid,
    };

    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/notas`), newNote);
      setNotes(prevNotes => [{ id: docRef.id, ...newNote }, ...prevNotes]);
    } catch (e) {
      console.error("Erro ao adicionar nota: ", e);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!user?.uid) return;

    try {
      const noteDoc = doc(db, `users/${user.uid}/notas`, id);
      await deleteDoc(noteDoc);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (e) {
      console.error("Erro ao excluir nota: ", e);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (event) => setSearch(event.target.value);

  return (
    <section className="min-h-screen min-w-screen">
      <div className="mx-auto max-w-6xl space-y-6 px-5 pb-6">
        <form className="w-full pt-32">
          <div className="relative rounded-lg inline-block w-full bg-white border-4 border-zinc-900 text-zinc-900 shadow-[8px_8px_0px_rgba(0,0,0,0.75)]">
            <input
              type="text"
              placeholder="Busque em suas notas..."
              className="block w-full focus:outline-none rounded-xl border-0 py-3 text-gray-900 bg-white placeholder:text-gray-400 pl-10"
              onChange={handleSearch}
            />
            <MagnifyingGlass size={20} weight="duotone" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          <NewNoteCards onNoteCreated={onNoteCreated} />

          {filteredNotes.map(note => (
            <NoteCards
              key={note.id}
              date={note.date}
              content={note.content}
              handleDeleteNote={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
