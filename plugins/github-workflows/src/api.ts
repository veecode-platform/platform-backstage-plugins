import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';
import { Branches, Workflow, WorkflowDispatchParameters, WorkflowResponseFromApi, WorkflowRun, WorkflowRunsResponseFromApi } from './utils/types';
import YAML from "js-yaml"
// import { Entity } from '@backstage/catalog-model';

const GITHUB_WORKFLOWS_DEFAULT_PROXY_URL = "/github-workflows"

export interface Workflows {
    workflow: {
        id: number
        name: string
        state: string
        url: string
        path: string
        createdAt: string
        updatedAt: string
    },
    latestRun: {
        id: number
        status: string
        conclusion: string
    },
    parameters: WorkflowDispatchParameters[]
}

export interface GithubWorkflowsApi {
    /**
    * list workflows
    * possible to filter by workflow file name
    * Ex filter => ["application-dashboards.yaml", "another.yaml"]
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
    startWorkflowRun(workflowId: string, githubRepoSlug: string, branch: string, inputs?: object): Promise<WorkflowRun>;
    /**
    * stop a run from a worflow
    */
    stopWorkflowRun(runId: string, githubRepoSlug: string): Promise<void>;
    /**
    * list workflow dispatch parameters from definition
    */
    listWorkflowDispatchParameters(githubRepoSlug: string, filePath: string, branch: string): Promise<WorkflowDispatchParameters[]>;
    /**
    * list workflows refactor to include usefull
    */
    listWorkflowsRefactor(githubRepoSlug: string, branch: string, filter?: string[]): Promise<Workflows[]>;
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

        if(resp.status === 204) return {ok: true} as any
        return await resp.json();
    }

    async apiUrl(githubRepoSlug: string) {
        const baseUrl = await this.discoveryApi.getBaseUrl("proxy")
        return `${baseUrl}${this.proxyPath}/${githubRepoSlug}`
    }

    async listWorkflows(githubRepoSlug: string, filter?: string[]) {
        const response = await this.fetch<WorkflowResponseFromApi>("/actions/workflows", githubRepoSlug)
        if (!filter || filter.length === 0) return response.workflows
        const filteredWorkflows = response.workflows.filter(
            workflow => filter.includes(regexFileName(workflow.path))
        )
        return filteredWorkflows
    }

    async listWorkflowRuns(workflowId: string, githubRepoSlug: string) {
        const response = await this.fetch<WorkflowRunsResponseFromApi>(`/actions/workflows/${workflowId}/runs`, githubRepoSlug)
        return response.workflow_runs
    }

    async listWorkflowRunsTotalCount(workflowId: string, githubRepoSlug: string){
        const response = await this.fetch<WorkflowRunsResponseFromApi>(`/actions/workflows/${workflowId}/runs`, githubRepoSlug)
        return response
    }

    async listBranchesFromRepo(githubRepoSlug: string) {
        return await this.fetch<Branches[]>("/branches", githubRepoSlug)
    }

    async getWorkflowRunById(runId: string, githubRepoSlug: string) {
        return await this.fetch<WorkflowRun>(`/actions/runs/${runId}`, githubRepoSlug)
    }

    async getLatestWorkflowRun(workflowId: string, githubRepoSlug: string) {
        const response = await this.fetch<WorkflowRunsResponseFromApi>(`/actions/workflows/${workflowId}/runs`, githubRepoSlug)
        return response.workflow_runs[0]
    }

    async startWorkflow(workflowId: string, githubRepoSlug: string, branch: string, inputs?: object) {
        const body: {ref:string, inputs?: object} = {
            ref: branch 
        }
        if(inputs) body.inputs = inputs
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const totalWorkflowRunsBefore = await this.listWorkflowRunsTotalCount(workflowId, githubRepoSlug)
        let totalWorkflowRunsAfter = totalWorkflowRunsBefore
        let loadTime = 3000
        
        await this.fetch(`/actions/workflows/${workflowId}/dispatches`, githubRepoSlug, headers);
        do{
            await this.waitTime(loadTime)
            totalWorkflowRunsAfter = await this.listWorkflowRunsTotalCount(workflowId, githubRepoSlug)
            loadTime = loadTime * 2 + 1000     
        }
        while(totalWorkflowRunsAfter.total_count === totalWorkflowRunsBefore.total_count)
        return totalWorkflowRunsAfter.workflow_runs[0]
    }

    async waitTime(time: number){
        return await new Promise(r => setTimeout(r, time))
    }

    async stopWorkFlowRun(runId: string, githubRepoSlug: string) {
        const inProgress = ["in_progress", "queued", "requested", "waiting", "pending"]
        const runStatus = await this.getWorkflowRunById(runId, githubRepoSlug)
        if(!inProgress.includes(runStatus.status)) throw new Error("Impossible to stop this run, not in progress!")
        const headers: RequestInit = {
            method: "POST"
        }
        const response = await this.fetch(`/actions/runs/${runId}/cancel`, githubRepoSlug, headers)
        return response
    }

    async getFileContentFromPath(githubRepoSlug: string, filePath: string, branch: string) {
        const response = await this.fetch(`/contents/${filePath}${branch ? `?ref=${branch}` : "" }`, githubRepoSlug)
        const yamlContent = YAML.load(Buffer.from(response.content, 'base64').toString('utf8')) as any
        return yamlContent
    }

    async listWorkflowsDispatchParameters(githubRepoSlug: string, filePath: string, branch: string) {
        const yamlContent = await this.getFileContentFromPath(githubRepoSlug, filePath, branch)
        if (!yamlContent.on?.workflow_dispatch?.inputs) return []
        const inputs = yamlContent.on.workflow_dispatch?.inputs
        
        const mapedInputs: WorkflowDispatchParameters[] = Object.keys(inputs).map((input) => {
            const currentInput = inputs[input]
            const result: WorkflowDispatchParameters = {
                name: input,
                description: currentInput.description ?? "",
                default: currentInput.default ?? "",
                required: currentInput.required ?? false,
                type: currentInput.type ?? "string"
            }
            if (currentInput.type === "choice") {
                result.options = currentInput.options
            }
            return result
        })
        return mapedInputs
    }

    async listWorkflowsRefactor(githubRepoSlug: string, branch: string, filter?: string[]){
        const workflows = await this.listWorkflows(githubRepoSlug, filter)
        const response = await Promise.all(workflows.map(async (workflow): Promise<Workflows> => {
            const latestWorkflowRun = await this.getLatestWorkflowRun(workflow.id.toString(), githubRepoSlug)
            const dispatchParameters = await this.listWorkflowsDispatchParameters(githubRepoSlug, workflow.path, branch)
            return {
                workflow: {
                    id: workflow.id,
                    name: workflow.name,
                    state: workflow.state,
                    url: workflow.html_url,
                    path: workflow.path,
                    createdAt: workflow.createdAt,
                    updatedAt: workflow.updatedAt
                },
                latestRun: {
                    id: latestWorkflowRun.id,
                    status: latestWorkflowRun.status,
                    conclusion: latestWorkflowRun.conclusion

                },
                parameters: dispatchParameters
            }
        }))
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

    async listWorkflowDispatchParameters(githubRepoSlug: string, filePath: string, branch: string): Promise<WorkflowDispatchParameters[]> {
        return this.client.listWorkflowsDispatchParameters(githubRepoSlug, filePath, branch)
    }

    async listWorkflowsRefactor(githubRepoSlug: string, branch: string, filter?: string[]): Promise<Workflows[]> {
        return this.client.listWorkflowsRefactor(githubRepoSlug, branch, filter)
    }
}