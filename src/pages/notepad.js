import { NotepadCards } from "@/components";
import { withAuth } from "@/components/Context";

function NotePads() {
  return <NotepadCards />;
}

export default withAuth(NotePads);
