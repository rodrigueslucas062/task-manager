import withAuth from "@/components/Context/authContext/withAuth";
import Tasks from "@/components/ToDo";

function TaskList() {
  return <Tasks />;
}

export default withAuth(TaskList)
