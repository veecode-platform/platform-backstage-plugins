import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';
import { Branches, Workflow, WorkflowResponseFromApi, WorkflowRun, WorkflowRunsResponseFromApi } from './utils/types';
// import { Entity } from '@backstage/catalog-model';

const GITHUB_WORKFLOWS_DEFAULT_PROXY_URL = "/github-workflows"


export interface GithubWorkflowsApi {
    /**
    * list workflows
    * possible to filter by workflow file name
    * Ex filter => ["application-dashboards.yml", "another.yaml"]
    */
    listWorkflows(githubRepoSlug: string, filter?: string[]): Promise<Workflow[]>;
    /**
    * list branches from a repository
    */
    listBranchesFromRepo(githubRepoSlug: string): Promise<Branches[]>;
    /**
    * list all runs from a workflow
    */
    listWorkflowRuns(workflowId: string, githubRepoSlug: string): Promise<WorkflowRun[]>;
    /**
    * get a single run by id from a workflow
    */
    getWorkflowRunById(runId: string, githubRepoSlug: string): Promise<WorkflowRun>;
    /**
    * get latest workflow run
    */
    getLatestWorkflowRun(workflowId: string, githubRepoSlug: string): Promise<WorkflowRun>;
    /**
    * dispatch a run from a branch of a workflow
    */
    startWorkflowRun(workflowId: string, githubRepoSlug: string, branch: string): Promise<WorkflowRun>;
    /**
    * stop a run from a worflow
    */
    stopWorkflowRun(runId: string, githubRepoSlug: string): Promise<void>;
}

export const githubWorkflowsApiRef = createApiRef<GithubWorkflowsApi>({
    id: 'plugin.githubworkflows',
});

export type Options = {
    discoveryApi: DiscoveryApi;
    /**
    * Path to use for requests via the proxy, defaults to /github-workflows
    */
    proxyPath?: string;
};

const regexFileName = (input: string) => {
    const fileName = input.match(/(?:[\w\d\-\.](?!\/))+$/) ?? ""
    return fileName[0]
}

class Client {
    private readonly discoveryApi: DiscoveryApi;
    private readonly proxyPath: string;

    constructor(opts: Options) {
        this.discoveryApi = opts.discoveryApi;
        this.proxyPath = opts.proxyPath ?? GITHUB_WORKFLOWS_DEFAULT_PROXY_URL
    }

    public async fetch<T = any>(input: string, githubRepoSlug: string, init?: RequestInit): Promise<T> {
        const apiUrl = await this.apiUrl(githubRepoSlug);
    
        const resp = await fetch(`${apiUrl}${input}`, init);
        if (!resp.ok) {
          throw new Error(`Request failed with ${resp.status} ${resp.statusText}`);
        }
    
        return await resp.json();
    }

    async apiUrl(githubRepoSlug: string) {
        const baseUrl = await this.discoveryApi.getBaseUrl("proxy")
        return `${baseUrl}${this.proxyPath}/${githubRepoSlug}` 
    }

    async listWorkflows(githubRepoSlug: string, filter?: string[]) {
        const response = await this.fetch<WorkflowResponseFromApi>("/actions/workflows", githubRepoSlug)
        if(!filter) return response.workflows
        const filteredWorkflows = response.workflows.filter(
            workflow => filter.includes(regexFileName(workflow.path))
        )
        return filteredWorkflows
    }

    async listWorkflowRuns(workflowId: string, githubRepoSlug: string){
        const response = await this.fetch<WorkflowRunsResponseFromApi>(`/actions/workflows/${workflowId}/runs`, githubRepoSlug)
        return response.workflow_runs
    }

    async listBranchesFromRepo(githubRepoSlug: string){
        return await this.fetch<Branches[]>("/branches", githubRepoSlug)
    }

    async getWorkflowRunById(runId: string, githubRepoSlug: string){
        return await this.fetch<WorkflowRun>(`/actions/runs/${runId}`, githubRepoSlug)
    }

    async getLatestWorkflowRun(workflowId: string, githubRepoSlug: string){
        const response = await this.fetch<WorkflowRunsResponseFromApi>(`/actions/workflows/${workflowId}/runs`, githubRepoSlug)
        return response.workflow_runs[0]
    }

    async startWorkflow(workflowId: string, githubRepoSlug: string, branch: string){
        const headers: RequestInit  = {
            method: "POST",
            body: JSON.stringify({
                ref: branch
            })        
        }
        await this.fetch(`/actions/workflows/${workflowId}/dispatches`, githubRepoSlug, headers)
        return (await this.listWorkflowRuns(workflowId, githubRepoSlug))[0]
    }

    async stopWorkFlowRun(runId: string, githubRepoSlug: string,){
        const headers: RequestInit  = {
            method: "POST"        
        }
        const response = await this.fetch(`/actions/runs/${runId}/cancel`, githubRepoSlug, headers)
        return response
    }
}

export class GithubWorkflowsApiClient implements GithubWorkflowsApi { 

    private readonly client: Client;

    constructor(opts: Options) {
        this.client = new Client(opts);
    }

    async listWorkflows(githubRepoSlug: string, filter?: string[]): Promise<Workflow[]> {
        return this.client.listWorkflows(githubRepoSlug, filter)
    }

    async listWorkflowRuns(workflowId: string, githubRepoSlug: string): Promise<WorkflowRun[]> {
        return this.client.listWorkflowRuns(workflowId, githubRepoSlug) 
    }

    async listBranchesFromRepo(githubRepoSlug: string): Promise<Branches[]> {
        return this.client.listBranchesFromRepo(githubRepoSlug)
    }

    async getWorkflowRunById(runId: string, githubRepoSlug: string): Promise<WorkflowRun> {
        return this.client.getWorkflowRunById(runId, githubRepoSlug)
    }
    
    async getLatestWorkflowRun(workflowId: string, githubRepoSlug: string): Promise<WorkflowRun> {
        return this.client.getLatestWorkflowRun(workflowId, githubRepoSlug)
    }
    
    async startWorkflowRun(workflowId: string, githubRepoSlug: string, branch: string): Promise<WorkflowRun> {
        return this.client.startWorkflow(workflowId, githubRepoSlug, branch)  
    }

    async stopWorkflowRun(runId: string, githubRepoSlug: string): Promise<void> {
        return this.client.stopWorkFlowRun(runId, githubRepoSlug)
    }
}