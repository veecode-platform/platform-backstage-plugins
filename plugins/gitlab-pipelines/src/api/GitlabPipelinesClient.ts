import { DiscoveryApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { Options } from "./types";
import { GITLAB_PIPELINES_PROXY_URL } from "../utils/constants";
import { JobsVariablesAttributes, ListBranchResponse, ListJobsResponse, PipelineListResponse, PipelineResponse, VariablesParams } from "../utils/types";
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

    constructor(opts: Options) {
        this.discoveryApi = opts.discoveryApi;
        this.scmAuthApi = opts.scmAuthApi;
        this.proxyPath = opts.proxyPath ?? GITLAB_PIPELINES_PROXY_URL
    }

    public async fetch<T = any>(input: string, hostname:string = 'gitlab.com', gitlabReposlug: string, init?: RequestInit): Promise<T> {
        const { token } = await this.scmAuthApi.getCredentials({
           url: `https://${hostname}`,
           additionalScope:{
               customScopes:{
                   gitlab: ['read_user', 'api', 'read_api', 'read_repository']
               }
           }
        })
        const apiUrl = await this.apiUrl(gitlabReposlug);

       const resp = await fetch(`${apiUrl}${input}`, {
           ...init,
           headers: {
              Authorization: `Bearer ${token}`}
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

    async listBranchesFromRepo(hostname: string,gitlabReposlug: string) {
        return await this.fetch<ListBranchResponse[]>(`/repository/branches`, hostname, gitlabReposlug)
    }

    async listProjectPipelines(hostname: string, gitlabReposlug: string, branch: string) {
        const response = await this.fetch<PipelineListResponse[]>(`/pipelines?ref=${branch}`, hostname, gitlabReposlug)
        return response
    }

    async getSinglePipeline(hostname:string,gitlabReposlug: string, pipelineId:number, branch: string) {
        const response = await this.fetch<PipelineListResponse>(`/pipelines/${pipelineId}?ref=${branch}`, hostname, gitlabReposlug)
        return response
    }

    async getLatestPipeline(hostname: string,gitlabReposlug: string, branch: string) {
        const response = await this.fetch<PipelineResponse>(`/pipelines/latest?ref=${branch}`, hostname,gitlabReposlug)
        return response
    }

    async runNewPipeline(hostname:string,gitlabReposlug: string, branch: string, variables: VariablesParams[]) {
        const requestBody = {
            ref: branch,
            variables: variables
        };
        const response = await this.fetch<PipelineResponse>(`/pipeline?ref=${branch}`, hostname, gitlabReposlug,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        return response
    }

    async runNewPipelineWithTrigger(hostname:string,gitlabReposlug: string, triggerToken: string, branch: string) {
        const requestBody = {
            token: triggerToken,
            ref: branch
        };
        const response = await this.fetch<PipelineResponse>(`/trigger/pipeline`, hostname, gitlabReposlug,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        return response
    }

    async retryPipelineJobs(hostname:string, gitlabReposlug: string, pipelineId: number) {
        const response = await this.fetch<PipelineResponse>(`/pipelines/${pipelineId}/retry`, hostname, gitlabReposlug,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }

    async cancelPipelineJobs(hostname: string,gitlabReposlug: string, pipelineId: number, branch: string) {
        const response = await this.fetch<PipelineResponse>(`/pipelines/${pipelineId}/cancel?ref=${branch}`, hostname,gitlabReposlug,
            {
                method: 'POST'
            });
        return response
    }


    async listPipelineJobs(hostname:string, gitlabReposlug: string, pipelineId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse[]>(`/pipelines/${pipelineId}/jobs?ref=${branch}`, hostname, gitlabReposlug);
        return response
    }

    async getSingleJob(hostname: string,gitlabReposlug: string, jobId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}?ref=${branch}`, hostname, gitlabReposlug)
        return response
    }

    async runJob(hostname:string, gitlabReposlug: string, jobId: number, params: JobsVariablesAttributes[], branch: string) {
        const requestBody = {
            job_variables_attributes: params
        };
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}/play?ref=${branch}`, hostname,gitlabReposlug,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
        return response
    }

    async cancelJob(hostname:string, gitlabReposlug: string, jobId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}/cancel?ref=${branch}`, hostname, gitlabReposlug,
            {
                method: 'POST'
            })
        return response
    }

    async retryJob(hostname:string,gitlabReposlug: string, jobId: number, branch: string) {
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}/retry?ref=${branch}`, hostname, gitlabReposlug,
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

    async listBranchesFromRepo(hostname:string, gitlabReposlug: string): Promise<ListBranchResponse[]> {
        return this.client.listBranchesFromRepo(hostname,gitlabReposlug)
    }

    async listProjectPipelines(hostname:string, gitlabReposlug: string, branch: string): Promise<PipelineListResponse[]> {
        return this.client.listProjectPipelines(hostname,gitlabReposlug, branch)
    }

    async getSinglePipeline(hostname:string, gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineListResponse> {
        return this.client.getSinglePipeline(hostname,gitlabReposlug, pipelineId,branch);
    }

    async getLatestPipeline(hostname:string, gitlabReposlug: string, branch: string): Promise<PipelineResponse> {
        return this.client.getLatestPipeline(hostname,gitlabReposlug, branch)
    }

    async runNewPipeline(hostname:string, gitlabReposlug: string, branch: string, variables: VariablesParams[]): Promise<PipelineResponse> {
        return this.client.runNewPipeline(hostname,gitlabReposlug,branch,variables);
    }

    async runNewPipelineWithTrigger(hostname:string, gitlabReposlug: string, triggerToken: string, branch: string): Promise<PipelineResponse> {
        return this.client.runNewPipelineWithTrigger(hostname,gitlabReposlug,triggerToken,branch)
    }

    async retryPipelineJobs(hostname:string, gitlabReposlug: string, pipelineId: number): Promise<PipelineResponse> {
        return this.client.retryPipelineJobs(hostname,gitlabReposlug, pipelineId);
    }

    async cancelPipelineJobs(hostname:string, gitlabReposlug: string, pipelineId: number, branch: string): Promise<PipelineResponse> {
        return this.client.cancelPipelineJobs(hostname,gitlabReposlug, pipelineId, branch)
    }

    async listPipelineJobs(hostname:string, gitlabReposlug: string, pipelineId: number, branch: string): Promise<ListJobsResponse[]> {
        return this.client.listPipelineJobs(hostname,gitlabReposlug, pipelineId, branch);
    }

    async getSingleJob(hostname:string, gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.getSingleJob(hostname,gitlabReposlug, jobId, branch)
    }

    async runJob(hostname:string, gitlabReposlug: string, jobId: number, params: JobsVariablesAttributes[], branch: string): Promise<ListJobsResponse> {
        return this.client.runJob(hostname,gitlabReposlug, jobId, params, branch)
    }

    async cancelJob(hostname:string, gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.cancelJob(hostname,gitlabReposlug, jobId, branch)
    }

    async retryJob(hostname:string, gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.retryJob(hostname,gitlabReposlug, jobId, branch)
    }
}