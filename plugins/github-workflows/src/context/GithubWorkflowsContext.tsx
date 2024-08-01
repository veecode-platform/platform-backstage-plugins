import { createContext} from "react";
import { Job, WorkflowResultsProps, WorkflowRun } from "../utils/types";
import { RestEndpointMethodTypes } from "@octokit/rest";


export type GithubWorkflowsContextType = {
  listAllWorkflows: (filter?: string[]) => Promise<WorkflowResultsProps[] | null | void>,
  listJobsForWorkflowRun: (id: number) => Promise<Job[]>,
  branch: string | null,
  setBranchState: (branch: string) => void,
  inputsParamsState: object,
  setInputParams: (inputsParams: object) => void,
  getWorkflowById:(id: number) => Promise<WorkflowRun|null>,
  allWorkflowsState: WorkflowResultsProps[],
  setWorkflowsState: (workflowsParams: WorkflowResultsProps[]) => void,
  handleStartWorkflowRun: (workFlowId: number) => Promise<boolean>,
  handleStopWorkflowRun: (runId: number) => Promise<void>,
  downloadJobLogs: (jobId: number) => Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']|null>,
  listAllEnvironments: () => Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']|null>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);