import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';
// import { Entity } from '@backstage/catalog-model';

interface workflow {
    id: number;
    nodeId: string;
    name: string;
    path: string;
    state: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    htmlUrl: string;
    badgeUrl: string;
}
interface workflowResponseFromApi {
    totalCount: number;
    workflows: workflow[];
}

interface workflowRun {  
    id: string;
    name: string;
    headBranch: string;
    event: string;
    status: string;
    conclusion: string;
    runStartedAt: string;
    createdAt: string;
    updatedAt: string;
}
interface workflowRunsResponseFromApi {
    totalCount: number;
    workflow_runs: workflowRun[];
}

interface branches {
    name: string;
    protected: boolean;
}

const GITHUB_WORKFLOWS_DEFAULT_PROXY_URL = "/github-workflows"


export interface GithubWorkflowsApi {
    /**
    * list workflows
    * possible to filter by workflow file name
    * Ex filter => ["application-dashboards.yml", "another.yaml"]
    */
    listWorkflows(githubRepoSlug: string, filter?: string[]): Promise<workflow[]>;
    /**
    * list branches from a repository
    */
    listBranchesFromRepo(githubRepoSlug: string): Promise<branches[]>;
    /**
    * list all runs from a workflow
    */
    listWorkflowRuns(workflowId: string, githubRepoSlug: string): Promise<workflowRun[]>;
    /**
    * get a single run by id from a workflow
    */
    getWorkflowRunById(runId: string, githubRepoSlug: string): Promise<workflowRun>;
    /**
    * dispatch a run from a branch of a workflow
    */
    startWorkflowRun(workflowId: string, githubRepoSlug: string, branch: string): Promise<workflowRun>;
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
        const response = await this.fetch<workflowResponseFromApi>("/actions/workflows", githubRepoSlug)
        if(!filter) return response.workflows
        const filteredWorkflows = response.workflows.filter(
            workflow => filter.includes(regexFileName(workflow.path))
        )
        return filteredWorkflows
    }

    async listWorkflowRuns(workflowId: string, githubRepoSlug: string){
        const response = await this.fetch<workflowRunsResponseFromApi>(`/actions/workflows/${workflowId}/runs`, githubRepoSlug)
        return response.workflow_runs
    }

    async listBranchesFromRepo(githubRepoSlug: string){
        return await this.fetch<branches[]>("/branches", githubRepoSlug)
    }

    async getWorkflowRunById(runId: string, githubRepoSlug: string){
        return await this.fetch<workflowRun>(`/actions/runs/${runId}`, githubRepoSlug)
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

    async listWorkflows(githubRepoSlug: string, filter?: string[]): Promise<workflow[]> {
        return this.client.listWorkflows(githubRepoSlug, filter)
    }

    async listWorkflowRuns(workflowId: string, githubRepoSlug: string): Promise<workflowRun[]> {
        return this.client.listWorkflowRuns(workflowId, githubRepoSlug) 
    }

    async listBranchesFromRepo(githubRepoSlug: string): Promise<branches[]> {
        return this.client.listBranchesFromRepo(githubRepoSlug)
    }

    async getWorkflowRunById(runId: string, githubRepoSlug: string): Promise<workflowRun> {
        return this.client.getWorkflowRunById(runId, githubRepoSlug)
    }
    
    async startWorkflowRun(workflowId: string, githubRepoSlug: string, branch: string): Promise<workflowRun> {
        return this.client.startWorkflow(workflowId, githubRepoSlug, branch)  
    }

    async stopWorkflowRun(runId: string, githubRepoSlug: string): Promise<void> {
        return this.client.stopWorkFlowRun(runId, githubRepoSlug)
    }
}