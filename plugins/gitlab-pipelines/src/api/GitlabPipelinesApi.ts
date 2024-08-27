import { createApiRef } from "@backstage/core-plugin-api";
import { JobsVariablesAttributes, ListBranchResponse, ListJobsResponse, PipelineListResponse, PipelineResponse, VariablesParams } from "../utils/types";

export const gitlabPipelinesApiRef = createApiRef<GitlabPipelinesApi>({
    id: 'plugin.gitlabpipelines',
});

export interface GitlabPipelinesApi {
    /**
    * list branches from a repository
    */
    listBranchesFromRepo(gitlabReposlug: string): Promise<ListBranchResponse[]>;
    /**
    * list pipelines
    */
    listProjectPipelines(gitlabReposlug: string, branch: string): Promise<PipelineListResponse[]>;
    /**
     * Get a Single Pipeline
     */
    getSinglePipeline(gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineListResponse>;
    /**
     * Get Lastest pipeline
     */
    getLatestPipeline(gitlabReposlug: string, branch: string): Promise<PipelineResponse>;
    /**
     * run a new pipeline
     */
    runNewPipeline(gitlabReposlug: string, branch: string, variables: VariablesParams[]): Promise<PipelineResponse>
    /**
     *  run a new pipeline with trigger
     */
    runNewPipelineWithTrigger(gitlabReposlug: string, triggerToken: string, branch: string): Promise<PipelineResponse>;
    /**
     *  retry pipeline jobs
     */
    retryPipelineJobs(gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineResponse>;
    /**
     *  cancel pipeline jobs
     */
    cancelPipelineJobs(gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineResponse>;
    /**
     * list pipelines jobs
     */
    listPipelineJobs(gitlabReposlug: string, pipelineId: number, branch: string): Promise<ListJobsResponse[]>;
    /**
     * get single job
     * 
     */
    getSingleJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse>;
    /**
     *  run a single job
     */
    runJob(gitlabReposlug: string, jobId: number, params: JobsVariablesAttributes[], branch: string): Promise<ListJobsResponse>;
    /**
     *  cancel a single job
     */
    cancelJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse>;
    /**
     *  retry a single job
     */
    retryJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse>;
}