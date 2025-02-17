import { NotepadCards } from "@/components";
import { withAuth } from "@/components/Context/authContext/withAuth";

function NotePads() {
  return <NotepadCards />;
}

export default withAuth(NotePads);
