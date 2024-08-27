import { createContext } from "react";
import { Job, JobAnnotationProps, JobsVariablesAttributes, Pipeline, VariablesParams } from "../utils/types";
import { Entity } from "@backstage/catalog-model";


export type GitlabPipelinesContextType = {
  branch: string | null,
  jobsAnnotations: JobAnnotationProps[] | null,
  projectName: string,
  hostname:string,
  entity: Entity,
  setBranchState: (branch: string) => void,
  listAllPipelines: () => Promise<Pipeline[] | null>,
  pipelineListState: Pipeline[] | null,
  setPipelineListState: React.Dispatch<React.SetStateAction<Pipeline[] | null>>,
  latestPipeline: () => Promise<Pipeline | null>,
  latestPipelineState: Pipeline | null,
  setLatestPipelineState: React.Dispatch<React.SetStateAction<Pipeline | null>>,
  triggerToken: string,
  setTriggerTokenState: (token: string) => void,
  variablesParams: VariablesParams[] | null,
  setVariablesParams: React.Dispatch<React.SetStateAction<VariablesParams[] | null>>,
  runNewPipeline: (variables: VariablesParams[]) => Promise<void>,
  runPipelineWithTrigger: (triggerToken: string) => Promise<void>,
  retryPipeline: () => Promise<void>,
  cancelPipeline: () => Promise<void>,
  allJobs:  (pipelineId: number) => Promise<Job[] | null>,
  jobsListState: Job[] | null,
  jobsByAnnotation: JobAnnotationProps[] | null,
  setJobsByAnnotation: React.Dispatch<React.SetStateAction<JobAnnotationProps[] | null>>,
  setJobsListState: React.Dispatch<React.SetStateAction<Job[] | null>>,
  getSingleJob: (jobId: number) => Promise<Job | null>,
  runJob: (jobId: number, params: JobsVariablesAttributes[]) => Promise<Job | null>,
  jobParams: JobsVariablesAttributes | null,
  setJobParams: React.Dispatch<React.SetStateAction<JobsVariablesAttributes | null>>,
  cancelJob: (jobId: number) => Promise<Job | null>,
  retryJob: (jobId: number) => Promise<Job | null>
};

export const GitlabPipelinesContext = createContext<GitlabPipelinesContextType>(null!);