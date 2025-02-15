import { Jira, withAuth } from "@/components";

function JiraPage() {
  return <Jira />;
}

export default withAuth(JiraPage);
