import { createApiRef } from "@backstage/core-plugin-api";
import { JobsVariablesAttributes, ListBranchResponse, ListJobsResponse, PipelineListResponse, PipelineResponse, VariablesParams } from "../utils/types";

export const gitlabPipelinesApiRef = createApiRef<GitlabPipelinesApi>({
    id: 'plugin.gitlabpipelines',
});

export interface GitlabPipelinesApi {
    /**
    * list branches from a repository
    */
    listBranchesFromRepo(hostname:string,gitlabReposlug: string): Promise<ListBranchResponse[]>;
    /**
    * list pipelines
    */
    listProjectPipelines(hostname:string,gitlabReposlug: string, branch: string): Promise<PipelineListResponse[]>;
    /**
     * Get a Single Pipeline
     */
    getSinglePipeline(hostname:string,gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineListResponse>;
    /**
     * Get Lastest pipeline
     */
    getLatestPipeline(hostname:string,gitlabReposlug: string, branch: string): Promise<PipelineResponse>;
    /**
     * run a new pipeline
     */
    runNewPipeline(hostname:string,gitlabReposlug: string, branch: string, variables: VariablesParams[]): Promise<PipelineResponse>
    /**
     *  run a new pipeline with trigger
     */
    runNewPipelineWithTrigger(hostname:string,gitlabReposlug: string, triggerToken: string, branch: string): Promise<PipelineResponse>;
    /**
     *  retry pipeline jobs
     */
    retryPipelineJobs(hostname:string,gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineResponse>;
    /**
     *  cancel pipeline jobs
     */
    cancelPipelineJobs(hostname:string,gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineResponse>;
    /**
     * list pipelines jobs
     */
    listPipelineJobs(hostname:string,gitlabReposlug: string, pipelineId: number, branch: string): Promise<ListJobsResponse[]>;
    /**
     * get single job
     * 
     */
    getSingleJob(hostname:string,gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse>;
    /**
     *  run a single job
     */
    runJob(hostname:string,gitlabReposlug: string, jobId: number, params: JobsVariablesAttributes[], branch: string): Promise<ListJobsResponse>;
    /**
     *  cancel a single job
     */
    cancelJob(hostname:string,gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse>;
    /**
     *  retry a single job
     */
    retryJob(hostname:string,gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse>;
}