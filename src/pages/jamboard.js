import withAuth from "@/components/Context/authContext/withAuth";
import Whiteboard from "@/components/Jamboard/Jamboard";

function WhiteboardPage() {
  return <Whiteboard />;
}

export default withAuth(WhiteboardPage);
