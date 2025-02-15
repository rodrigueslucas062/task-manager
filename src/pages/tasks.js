import { Tasks, withAuth } from "@/components";

function TaskList() {
  return <Tasks />;
}

export default withAuth(TaskList)
