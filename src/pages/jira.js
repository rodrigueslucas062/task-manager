import Jira from "@/components/Jira";

function JiraPage() {
  return <Jira />;
}

export default withAuth(JiraPage);
