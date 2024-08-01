import { createContext} from "react";
import { Job, WorkflowResultsProps, WorkflowRun } from "../utils/types";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { Entity } from "@backstage/catalog-model";


export type GithubWorkflowsContextType = {
  entity: Entity,
  projectName: string,
  hostname: string,
  workflowsByAnnotation: string[] | null,
  branch: string | null,
  setBranchState: (branch: string) => void,
  inputsParamsState: object,
  setInputParams: (inputsParams: object) => void,
  allWorkflowsState: WorkflowResultsProps[],
  setWorkflowsState: (workflowsParams: WorkflowResultsProps[]) => void,
  listAllWorkflows: (filter?: string[]) => Promise<WorkflowResultsProps[] | null | void>,
  listJobsForWorkflowRun: (id: number) => Promise<Job[]>,
  getWorkflowById:(id: number) => Promise<WorkflowRun|null>,
  handleStartWorkflowRun: (workFlowId: number) => Promise<boolean>,
  handleStopWorkflowRun: (runId: number) => Promise<void>,
  downloadJobLogs: (jobId: number) => Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']|null>,
  listAllEnvironments: () => Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']|null>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);