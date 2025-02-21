import { Jamboard } from "@/components";
import { withAuth } from "@/components/Context";

function JamboardPage() {
  return <Jamboard />;
}

export default withAuth(JamboardPage);
