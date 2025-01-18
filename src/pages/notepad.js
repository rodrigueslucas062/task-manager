import withAuth from "@/components/Context/authContext/withAuth";
import NotepadCards from "@/components/NoteCards/NotepadCards";

function NotePads() {
  return <NotepadCards />;
}

export default withAuth(NotePads);
