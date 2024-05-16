import { createContext} from "react";
import { Job, WorkflowResultsProps, WorkflowRun } from "../utils/types";
import { RestEndpointMethodTypes } from "@octokit/rest";


export type GithubWorkflowsContextType = {
  listAllWorkflows: (projectName: string, filter?: string[]) => Promise<WorkflowResultsProps[] | null | void>,
  listJobsForWorkflowRun: (projectName: string, id: number) => Promise<Job[]>,
  branch: string | null,
  setBranchState: (branch: string) => void,
  setInputs: (inputs: object) => void,
  inputsWorkflowsParams: object | null,
  getWorkflowById:(id: number, projectName: string) => Promise<WorkflowRun|null>,
  workflowsState: WorkflowResultsProps[] | null,
  setWorkflowsState: React.Dispatch<React.SetStateAction<WorkflowResultsProps[] | null>>,
  workflowsByAnnotationsState: WorkflowResultsProps[] | null,
  setWorkflowsByAnnotationsState:  React.Dispatch<React.SetStateAction<WorkflowResultsProps[] | null>>,
  handleStartWorkflowRun: (workFlowId: number, projectSlug: string) => Promise<WorkflowRun | null>,
  handleStopWorkflowRun: (runId: number, projectSlug: string) => Promise<void>,
  downloadJobLogs: (projectSlug: string, jobId: number) => Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']|null>,
  listAllEnvironments: (projectSlug: string) => Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']|null>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);