import { ConfigApi, createApiRef, DiscoveryApi, errorApiRef } from '@backstage/core-plugin-api';
import { JobsVariablesAttributes, ListBranchResponse, ListJobsResponse, PipelineListResponse, PipelineResponse, VariablesParams } from './utils/types';
import { ScmAuthApi } from '@backstage/integration-react';

const GITLAB_PIPELINES_PROXY_URL = "/gitlab/api";

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

export const gitlabPipelinesApiRef = createApiRef<GitlabPipelinesApi>({
    id: 'plugin.gitlabpipelines',
});

export type Options = {
    discoveryApi: DiscoveryApi;
    scmAuthApi: ScmAuthApi;
    configApi: ConfigApi
    /**
    * Path to use for requests via the proxy, defaults to /gitlab/api
    */
    proxyPath?: string;
};


class Client {
    private readonly discoveryApi: DiscoveryApi;
    private readonly proxyPath: string;
    private readonly scmAuthApi: ScmAuthApi;
    private readonly configApi: ConfigApi;

    constructor(opts: Options) {
        this.discoveryApi = opts.discoveryApi;
        this.scmAuthApi = opts.scmAuthApi;
        this.proxyPath = opts.proxyPath ?? GITLAB_PIPELINES_PROXY_URL
        this.configApi = opts.configApi
    }

    public async fetch<T = any>(input: string, gitlabReposlug: string, init?: RequestInit): Promise<T> {
        const { token } = await this.scmAuthApi.getCredentials({
            url: `https://gitlab.com`,
            additionalScope:{
                customScopes:{
                    gitlab:['read_user', 'read_api', 'read_repository']
                }
            }
        })
        const apiUrl = await this.apiUrl(gitlabReposlug);

        const resp = await fetch(`${apiUrl}${input}`, {
            ...init,
            headers: {
                'PRIVATE-TOKEN': token
            }
        });
        
        if (!resp.ok) {
            
            throw new Error(`Request failed with ${resp.status} - ${(await resp.json()).message}`);
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
        const response = await this.fetch<PipelineResponse>(`/pipelines/latest?ref=${branch}`, gitlabReposlug)
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
        const response = await this.fetch<PipelineResponse>(`/pipelines/${pipelineId}/cancel?ref=${branch}`, gitlabReposlug,
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

    async runJob(gitlabReposlug: string, jobId: number, params: JobsVariablesAttributes[], branch: string) {
        const requestBody = {
            job_variables_attributes: params
        };
        const response = await this.fetch<ListJobsResponse>(`/jobs/${jobId}/play?ref=${branch}`, gitlabReposlug,
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

    async runJob(gitlabReposlug: string, jobId: number, params: JobsVariablesAttributes[], branch: string): Promise<ListJobsResponse> {
        return this.client.runJob(gitlabReposlug, jobId, params, branch)
    }

    async cancelJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.cancelJob(gitlabReposlug, jobId, branch)
    }

    async retryJob(gitlabReposlug: string, jobId: number, branch: string): Promise<ListJobsResponse> {
        return this.client.retryJob(gitlabReposlug, jobId, branch)
    }
}