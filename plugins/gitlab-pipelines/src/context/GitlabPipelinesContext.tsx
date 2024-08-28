import { createContext } from "react";
import { Job, JobAnnotationProps, JobVariablesAttributes, Pipeline, VariablesParams } from "../utils/types";
import { Entity } from "@backstage/catalog-model";
import { JobsActionType, JobsAnnotationActionType, JobVariablesActionType, LatestPipelinesActionType, PipelinesActionType, VariablesActionType } from "./state";


export type GitlabPipelinesContextType = {
  branch: string | null,
  jobsAnnotations: JobAnnotationProps[] | null,
  projectName: string,
  hostname:string,
  entity: Entity,
  setBranchState: (branch: string) => void,
  listAllPipelines: () => Promise<Pipeline[] | null>,
  pipelineListState: Pipeline[] | null,
  dispatchPipelines:  React.Dispatch<PipelinesActionType>,
  latestPipeline: () => Promise<Pipeline | null>,
  latestPipelineState: Pipeline | null,
  dispachLatestPipeline: React.Dispatch<LatestPipelinesActionType>,
  triggerToken: string,
  setTriggerTokenState: (token: string) => void,
  variablesParams: VariablesParams[] | null,
  dispatchVariablesParams: React.Dispatch<VariablesActionType>,
  runNewPipeline: (variables: VariablesParams[]) => Promise<void>,
  runPipelineWithTrigger: (triggerToken: string) => Promise<void>,
  retryPipeline: () => Promise<void>,
  cancelPipeline: () => Promise<void>,
  allJobs:  (pipelineId: number) => Promise<Job[] | null>,
  jobsListState: Job[] | null,
  jobsByAnnotation: JobAnnotationProps[] | null,
  dispatchJobsByAnnotation: React.Dispatch<JobsAnnotationActionType>,
  dispatchJobList: React.Dispatch<JobsActionType>,
  getSingleJob: (jobId: number) => Promise<Job | null>,
  runJob: (jobId: number, params: JobVariablesAttributes[]) => Promise<Job | null>,
  jobParams: JobVariablesAttributes | null,
  dispatchJobParams: React.Dispatch<JobVariablesActionType>,
  cancelJob: (jobId: number) => Promise<Job | null>,
  retryJob: (jobId: number) => Promise<Job | null>
};

export const GitlabPipelinesContext = createContext<GitlabPipelinesContextType>(null!);