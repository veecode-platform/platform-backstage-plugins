import { createContext} from "react";
import { WorkflowResultsProps, WorkflowRun } from "../../utils/types";


export type GithubWorkflowsContextType = {
  branch: string | null,
  setBranchState: (branch: string) => void,
  workflowsState: WorkflowResultsProps[] | null,
  handleLatestWorkFlow: (id: number, projectSlug: string) => Promise<{status: string; conclusion: string;} | null>,
  handleStartWorkflowRun: (workFlowId: number, projectSlug: string, branch: string) => Promise<WorkflowRun>,
  handleStopWorkflowRun: (runId: string, projectSlug: string) => Promise<void>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);