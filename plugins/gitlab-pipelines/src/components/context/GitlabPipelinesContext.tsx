import { createContext } from "react";
import { Job, JobsVariablesAttributes, Pipeline } from "../../utils/types";


export type GitlabPipelinesContextType = {
  branch: string | null,
  setBranchState: (branch: string) => void,
  listAllPipelines: (ProjectName: string) => Promise<Pipeline[] | null>,
  pipelineListState: Pipeline[] | null,
  setPipelineListState: React.Dispatch<React.SetStateAction<Pipeline[] | null>>,
  latestPipeline: (projecName: string) => Promise<Pipeline | null>,
  latestPipelineState: Pipeline | null,
  triggerToken: string,
  setTriggerTokenState: (token: string) => void,
  runNewPipeline: (projectName: string) => Promise<void>,
  runPipelineWithTrigger: (projectName: string, triggerToken: string) => Promise<void>,
  retryPipeline: (projectName: string) => Promise<void>,
  cancelPipeline: (projectName: string) => Promise<void>,
  allJobs:  (projectName: string, pipelineId: number) => Promise<Job[] | null>,
  JobsFiltered: (projectName: string, pipelineId: number) => Promise<Job[] | null>,
  jobsListState: Job[] | null,
  setJobsListState: React.Dispatch<React.SetStateAction<Job[] | null>>,
  getSingleJob: (projectName: string, jobId: number) => Promise<Job | null>,
  runJob: (projectName: string, jobId: number, params: JobsVariablesAttributes[]) => Promise<Job | null>,
  jobParams: JobsVariablesAttributes | null,
  setJobParams: React.Dispatch<React.SetStateAction<JobsVariablesAttributes | null>>,
  cancelJob: (projectName: string, jobId: number) => Promise<Job | null>,
  retryJob: (projectName: string, jobId: number) => Promise<Job | null>
};

export const GitlabPipelinesContext = createContext<GitlabPipelinesContextType>(null!);