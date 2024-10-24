import { DiscoveryApi, FetchApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { Options } from "./types";
import { GITLAB_PIPELINES_PROXY_URL } from "../utils/constants";
import { JobVariablesAttributes, ListBranchResponse, ListJobsResponse, PipelineListResponse, PipelineResponse, VariablesParams } from "../utils/types";
import { GitlabPipelinesApi } from "./GitlabPipelinesApi";

/**
 * 
 * New implementation
 * @public
 * 
 */ 

class Client {
    private readonly discoveryApi: DiscoveryApi;
    private readonly proxyPath: string;
    private readonly scmAuthApi: ScmAuthApi;
    private readonly fetchApi: FetchApi;

    constructor(opts: Options) {
        this.discoveryApi = opts.discoveryApi;
        this.scmAuthApi = opts.scmAuthApi;
        this.proxyPath = opts.proxyPath ?? GITLAB_PIPELINES_PROXY_URL
        this.fetchApi = opts.fetchApi
    }

    public async fetch<T = any>(input: string, gitlabReposlug: string, init?: RequestInit): Promise<T> {
        const { token } = await this.scmAuthApi.getCredentials({
           url: `https://gitlab.com`,
           additionalScope:{
               customScopes:{
                   gitlab: ['read_user', 'api', 'read_api', 'read_repository']
               }
           }
        })

       const apiUrl = await this.apiUrl(gitlabReposlug);

       const resp = await this.fetchApi.fetch(`${apiUrl}${input}`, {
           ...init,
           headers: {
              Authorization: `Bearer ${token}`
            }
       });

        if (!resp.ok) {
            throw new Error(`Request failed - ${(await resp.json()).message}`);
        }
        
        return await resp.json();
    }

    async apiUrl(gitlabReposlug: string) {
        const baseUrl = await this.discoveryApi.getBaseUrl("proxy");
        return `${baseUrl}${this.proxyPath}/projects/${encodeURIComponent(gitlabReposlug)}`
    }

    async listBranchesFromRepo(gitlabReposlug: string) {
        return await this.fetch<ListBranchResponse[]>(`/repository/branches`, gitlabReposlug)
    }

    async listProjectPipelines(gitlabReposlug: string, branch: string) {
        const response = await this.fetch<PipelineListResponse[]>(`/pipelines?ref=${branch}`, gitlabReposlug)
        return response
    }

    async getSinglePipeline(gitlabReposlug: string, pipelineId:number, branch: string) {
        const response = await this.fetch<PipelineListResponse>(`/pipelines/${pipelineId}?ref=${branch}`, gitlabReposlug)
        return response
    }

    async getLatestPipeline(gitlabReposlug: string, branch: string) {
        const response = await this.fetch<PipelineResponse>(`/pipelines/latest?ref=${branch}`,gitlabReposlug)
        return response
    }

    async runNewPipeline(gitlabReposlug: string, branch: string, variables: VariablesParams[]) {
        const requestBody = {
            ref: branch,
            variables: variables
        };
        const response = await this.fetch<PipelineResponse>(`/pipeline?ref=${branch}`, gitlabReposlug,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        return response
    }

    async runNewPipelineWithTrigger(gitlabReposlug: string, triggerToken: string, branch: string) {
        const requestBody = {
            token: triggerToken,
            ref: branch
        };
        const response = await this.fetch<PipelineResponse>(`/trigger/pipeline`, gitlabReposlug,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        return response
    }

    async retryPipelineJobs(gitlabReposlug: string, pipelineId: number) {
        const response = await this.fetch<PipelineResponse>(`/pipelines/${pipelineId}/retry`, gitlabReposlug,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    async cancelPipelineJobs(gitlabReposlug: string, pipelineId: number, branch: string) {
        const response = await this.fetch<PipelineResponse>(`/pipelines/${pipelineId}/cancel?ref=${branch}`,gitlabReposlug,
            {
                method: 'POST'
            });
        return response
    }


    async listPipelineJobs(gitlabReposlug: string, pipelineId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse[]>(`/pipelines/${pipelineId}/jobs?ref=${branch}`, gitlabReposlug);
        return response
    }

    async getSingleJob(gitlabReposlug: string, jobId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}?ref=${branch}`, gitlabReposlug)
        return response
    }

    async runJob(gitlabReposlug: string, jobId: number, params: JobVariablesAttributes[], branch: string) {
        const requestBody = {
            job_variables_attributes: params
        };
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}/play?ref=${branch}`,gitlabReposlug,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
        return response
    }

    async cancelJob(gitlabReposlug: string, jobId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}/cancel?ref=${branch}`, gitlabReposlug,
            {
                method: 'POST'
            })
        return response
    }

    async retryJob(gitlabReposlug: string, jobId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}/retry?ref=${branch}`, gitlabReposlug,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
}

export class GitlabPipelinesApiClient implements GitlabPipelinesApi {

    private readonly client: Client;

    constructor(opts: Options) {
        this.client = new Client(opts);
    }

    async listBranchesFromRepo(gitlabReposlug: string): Promise<ListBranchResponse[]> {
        return this.client.listBranchesFromRepo(gitlabReposlug)
    }

    async listProjectPipelines(gitlabReposlug: string, branch: string): Promise<PipelineListResponse[]> {
        return this.client.listProjectPipelines(gitlabReposlug, branch)
    }

    async getSinglePipeline(gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineListResponse> {
        return this.client.getSinglePipeline(gitlabReposlug, pipelineId,branch);
    }

    async getLatestPipeline(gitlabReposlug: string, branch: string): Promise<PipelineResponse> {
        return this.client.getLatestPipeline(gitlabReposlug, branch)
    }

    async runNewPipeline(gitlabReposlug: string, branch: string, variables: VariablesParams[]): Promise<PipelineResponse> {
        return this.client.runNewPipeline(gitlabReposlug,branch,variables);
    }

    async runNewPipelineWithTrigger(gitlabReposlug: string, triggerToken: string, branch: string): Promise<PipelineResponse> {
        return this.client.runNewPipelineWithTrigger(gitlabReposlug,triggerToken,branch)
    }

    async retryPipelineJobs(gitlabReposlug: string, pipelineId: number): Promise<PipelineResponse> {
        return this.client.retryPipelineJobs(gitlabReposlug, pipelineId);
    }

    async cancelPipelineJobs(gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineResponse> {
        return this.client.cancelPipelineJobs(gitlabReposlug, pipelineId, branch)
    }

    async listPipelineJobs(gitlabReposlug: string, pipelineId: number, branch: string): Promise<ListJobsResponse[]> {
        return this.client.listPipelineJobs(gitlabReposlug, pipelineId, branch);
    }

    async getSingleJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.getSingleJob(gitlabReposlug, jobId, branch)
    }

    async runJob(gitlabReposlug: string, jobId: number, params: JobVariablesAttributes[], branch: string): Promise<ListJobsResponse> {
        return this.client.runJob(gitlabReposlug, jobId, params, branch)
    }

    async cancelJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.cancelJob(gitlabReposlug, jobId, branch)
    }

    async retryJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.retryJob(gitlabReposlug, jobId, branch)
    }
}