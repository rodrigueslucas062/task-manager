import { Tasks } from "@/components";
import { withAuth } from "@/components/Context";

function TaskList() {
  return <Tasks />;
}

export default withAuth(TaskList)
