import { createContext} from "react";
import { Job, WorkflowAnnotation, WorkflowResultsProps, WorkflowRun } from "../utils/types";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { Entity } from "@backstage/catalog-model";
import { WorkflowActionType } from "./state";
import { InputsParamsType } from "./state/inputParamsState/types";


export type GithubWorkflowsContextType = {
  cardsView: boolean,
  setCardsView: React.Dispatch<React.SetStateAction<boolean>>,
  entity: Entity,
  projectName: string,
  hostname: string,
  workflowsByAnnotation: WorkflowAnnotation[] | null,
  branch: string | null,
  setBranchState: (branch: string) => void,
  inputsParamsState: InputsParamsType,
  setInputParams: (inputsParams: InputsParamsType) => void,
  allWorkflowsState: WorkflowResultsProps[],
  dispatchWorkflows: React.Dispatch<WorkflowActionType>,
  listAllWorkflows: (filter?: string[]) => Promise<WorkflowResultsProps[] | null | void>,
  listJobsForWorkflowRun: (id: number) => Promise<Job[]>,
  getWorkflowById:(id: number) => Promise<WorkflowRun|null>,
  handleStartWorkflowRun: (workFlowId: number) => Promise<boolean>,
  handleStopWorkflowRun: (runId: number) => Promise<void>,
  downloadJobLogs: (jobId: number) => Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']|null>,
  listAllEnvironments: () => Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']|null>
};

export const GithubWorkflowsContext = createContext<GithubWorkflowsContextType>(null!);