import { Jamboard, withAuth } from "@/components";

function JamboardPage() {
  return <Jamboard />;
}

export default withAuth(JamboardPage);
