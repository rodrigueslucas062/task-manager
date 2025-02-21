import { Jira } from "@/components";
import { withAuth } from "@/components/Context";

function JiraPage() {
  return <Jira />;
}

export default withAuth(JiraPage);
