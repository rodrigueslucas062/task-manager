import { NotepadCards, withAuth } from "@/components";

function NotePads() {
  return <NotepadCards />;
}

export default withAuth(NotePads);
