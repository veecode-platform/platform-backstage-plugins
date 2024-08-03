import { createContext} from "react";
import { Job, WorkflowResultsProps, WorkflowRun } from "../../utils/types";
import { RestEndpointMethodTypes } from "@octokit/rest";


export type GithubWorkflowsContextType = {
  listAllWorkflows: (hostname:string, projectName: string, filter?: string[]) => Promise<WorkflowResultsProps[] | null | void>,
  listJobsForWorkflowRun: (hostname:string, projectName: string, id: number) => Promise<Job[]>,
  branch: string | null,
  setBranchState: (branch: string) => void,
  setInputs: (inputs: object) => void,
  inputsWorkflowsParams: object | null,
  getWorkflowById:(hostname:string, projectName: string,id: number) => Promise<WorkflowRun|null>,
  workflowsState: WorkflowResultsProps[] | null,
  setWorkflowsState: React.Dispatch<React.SetStateAction<WorkflowResultsProps[] | null>>,
  workflowsByAnnotationsState: WorkflowResultsProps[] | null,
  setWorkflowsByAnnotationsState:  React.Dispatch<React.SetStateAction<WorkflowResultsProps[] | null>>,
  handleStartWorkflowRun: (hostname:string, projectSlug: string, workFlowId: number) => Promise<boolean>,
  handleStopWorkflowRun: (hostname:string, projectSlug: string, runId: number) => Promise<void>,
  downloadJobLogs: (hostname:string, projectSlug: string, jobId: number) => Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']|null>,
  listAllEnvironments: (hostname:string, projectSlug: string) => Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']|null>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);