import withAuth from "@/components/Context/authContext/withAuth";
import Jira from "@/components/Jira";

function JiraPage() {
  return <Jira />;
}

export default withAuth(JiraPage);
