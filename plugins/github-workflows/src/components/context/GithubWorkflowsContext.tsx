import { createContext} from "react";
import { WorkflowResultsProps, WorkflowRun } from "../../utils/types";


export type GithubWorkflowsContextType = {
  listAllWorkflows: () => Promise<WorkflowResultsProps[] | null>,
  projectName: string,
  branch: string | null,
  setBranchState: (branch: string) => void,
  workflowsState: WorkflowResultsProps[] | null,
  latestWorkFlow: (id: number, projectSlug: string) => Promise<{status: string; conclusion: string; runId: number} | null>,
  getWorkflowRunById: (runId: string, projectSlug: string) => Promise<WorkflowRun>,
  handleStartWorkflowRun: (workFlowId: number, projectSlug: string, branch: string) => Promise<WorkflowRun>,
  handleStopWorkflowRun: (runId: number, projectSlug: string) => Promise<void>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);