import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { GithubWorkflowsApi } from "./GithubWorkflowsApi";
import { regexFileName } from "../utils/helpers";
import YAML from "js-yaml"
import { WorkflowDispatchParameters } from "../utils/types";
import { GithubFileResponse, Options, Workflows } from "./types";
import { StatusWorkflowEnum } from "../utils/enums/WorkflowListEnum";
import { readGithubIntegrationConfigs } from "@backstage/integration";


 /**
 * 
 * New implementation
 * @public
 * 
 */ 

class Client {
  private readonly configApi: ConfigApi;
  private readonly scmAuthApi: ScmAuthApi;

  constructor(options: Options) {
    this.configApi = options.configApi;
    this.scmAuthApi = options.scmAuthApi;
  }

  private async getOctokit(hostname: string = 'github.com'):Promise<Octokit>{
    
    const { token } = await this.scmAuthApi.getCredentials({
      url: `https://${hostname}/`,
      additionalScope: {
        customScopes: {
          github: ['repo'],
        },
      },
    });
    const configs = readGithubIntegrationConfigs(
      this.configApi.getOptionalConfigArray('integrations.github') ?? [],
    );
    const githubIntegrationConfig = configs.find(v => v.host === hostname);
    const baseUrl = githubIntegrationConfig?.apiBaseUrl;
    return new Octokit({ auth: token, baseUrl });

  }

  private parseRepo(githubRepoSlug:string) : {repo:string, owner: string}{
    const parse = githubRepoSlug.split('/');
    return {owner: parse[0], repo: parse[1]}
  } 

  async listWorkflows(hostname: string,githubRepoSlug: string, filter?: string[]): Promise<RestEndpointMethodTypes['actions']['listRepoWorkflows']['response']['data']['workflows']>{
    const octokit = await this.getOctokit(hostname);
    const {owner, repo} = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.listRepoWorkflows({
      owner,
      repo
    });
    if(!filter || filter.length === 0) return response.data.workflows;
    const filteredWorkflows = response.data.workflows.filter(workflow => 
      filter.includes(regexFileName(workflow.path))
    )
    return filteredWorkflows;
  };

  async listWorkflowRuns(hostname:string, githubRepoSlug:string, branch:string):Promise<RestEndpointMethodTypes['actions']['listWorkflowRuns']['response']['data']['workflow_runs']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      branch
    });
    return response.data.workflow_runs
  }

  async listWorkflowRunsTotalCount(hostname:string, githubRepoSlug:string, workflowId:number):Promise<RestEndpointMethodTypes['actions']['listWorkflowRuns']['response']['data']['total_count']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.listWorkflowRuns({
      owner,
      repo,
      workflow_id: workflowId
    });
    return response.data.total_count
  }

  async listBranchesFromRepo(hostname: string, githubRepoSlug: string): Promise<RestEndpointMethodTypes['repos']['listBranches']['response']['data']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);

    const response = await octokit.rest.repos.listBranches({
      owner,
      repo
    });
    return response.data;
  }

  async getBranchDefaultFromRepo(hostname: string, githubRepoSlug: string):Promise<RestEndpointMethodTypes['repos']['get']['response']['data']['default_branch']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.rest.repos.get({
      owner,
      repo
    });
    return response.data.default_branch;
  }

  async startWorkflowRun(hostname:string, githubRepoSlug: string, workflowId: number, branch: string, inputs?: {[key: string]: unknown}): Promise<RestEndpointMethodTypes['actions']['createWorkflowDispatch']['response']['status']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const inputsParams = inputs || {};
    
    const totalWorkflowRunsBefore = await this.listWorkflowRunsTotalCount(
      hostname,
      githubRepoSlug,
      workflowId,
    );
    let totalWorkflowRunsAfter = totalWorkflowRunsBefore;
    const loadTime = 1500;

    const response = await octokit.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: workflowId,
      ref: branch,
      inputs: inputsParams
    }); 

    while (totalWorkflowRunsAfter === totalWorkflowRunsBefore) {
      await this.waitTime(loadTime);
      totalWorkflowRunsAfter = await this.listWorkflowRunsTotalCount(
        hostname,
        githubRepoSlug,
        workflowId,
      );
    }

    return response.status;
  }

  async waitTime(time: number) {
    return await new Promise(r => setTimeout(r, time));
  }

  async stopWorkflowRun(hostname:string,githubRepoSlug: string, runId: number):Promise<RestEndpointMethodTypes['actions']['cancelWorkflowRun']['response']['status']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.cancelWorkflowRun({
      owner,
      repo,
      run_id: runId
    }); 
    return response.status
  }

  async getLatestWorkflowRun(hostname:string, workflowId: number, githubRepoSlug: string):Promise<RestEndpointMethodTypes['actions']['listWorkflowRuns']['response']['data']['workflow_runs'][0]>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.listWorkflowRuns({
      owner,
      repo,
      workflow_id: workflowId
    });

    return response.data.workflow_runs[0]
  }

  async listJobsForWorkflowRun(hostname: string, githubRepoSlug: string, id: number,pageSize?:number,page?:number): Promise<RestEndpointMethodTypes['actions']['listJobsForWorkflowRun']['response']['data']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const jobs = await octokit.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id: id,
      per_page: pageSize,
      page
    });
    return jobs.data
  }

  async getWorkflowRunById(hostname:string, githubRepoSlug: string, runId: number):Promise<RestEndpointMethodTypes['actions']['getWorkflowRun']['response']['data']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const workflow = await octokit.actions.getWorkflowRun({
      owner,
      repo,
      run_id: runId
    });
    return workflow.data
  }

  async getFileContentFromPath(hostname:string, githubRepoSlug:string, filePath: string, branch:string):Promise<any>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      branch
    });

    const data : GithubFileResponse = response.data as GithubFileResponse;

    const yamlContent = YAML.load(
      Buffer.from(data.content, 'base64').toString('utf8'),
    ) as any;

    return yamlContent;

  }

  async listWorkflowsDispatchParameters(hostname:string, githubRepoSlug:string, filePath: string, branch:string):Promise<WorkflowDispatchParameters[]>{
    const yamlContent = await this.getFileContentFromPath(hostname, githubRepoSlug, filePath, branch);
    if (!yamlContent.on?.workflow_dispatch?.inputs) return [];
    const inputs = yamlContent.on.workflow_dispatch?.inputs;

    const mapedInputs: WorkflowDispatchParameters[] = Object.keys(inputs).map(
      input => {
        const currentInput = inputs[input];
        const result: WorkflowDispatchParameters = {
          name: input,
          description: currentInput.description ?? '',
          default: currentInput.default ?? '',
          required: currentInput.required ?? false,
          type: currentInput.type ?? 'string',
        };
        if (currentInput.type === 'choice') {
          result.options = currentInput.options;
        }
        return result;
      },
    );
    return mapedInputs;
  }

  async listWorkflowsResponse(hostname: string, githubRepoSlug: string, branch: string, filter?: string[]): Promise<Workflows[]>{
    const workflows = await this.listWorkflows(hostname, githubRepoSlug, filter);
    const response = await Promise.all(
      workflows.map(async (workflow): Promise<Workflows> => {
        const latestWorkflowRun = await this.getLatestWorkflowRun(
          hostname,
          workflow.id,
          githubRepoSlug,
        );
        const dispatchParameters = await this.listWorkflowsDispatchParameters(
          hostname,
          githubRepoSlug,
          workflow.path,
          branch,
        );
        const latestWorkflowRunData = latestWorkflowRun
          ? {
              id: latestWorkflowRun.id,
              status: latestWorkflowRun.status ?? undefined,
              conclusion: latestWorkflowRun.conclusion ?? undefined,
            }
          : {
              status: StatusWorkflowEnum.completed,
              conclusion: StatusWorkflowEnum.failure,
            };
        return {
          workflow: {
            id: workflow.id,
            name: workflow.name,
            state: workflow.state,
            url: workflow.html_url,
            path: workflow.path,
            createdAt: workflow.created_at,
            updatedAt: workflow.updated_at,
          },
          latestRun: latestWorkflowRunData,
          parameters: dispatchParameters,
        };
      }),
    );
    return response;
  }

  async downloadJobLogsForWorkflowRun (hostname:string, githubRepoSlug: string, jobId: number): Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const workflow = await octokit.actions.downloadJobLogsForWorkflowRun({
      owner,
      repo,
      job_id: jobId,
    });

    return workflow.data;
  }

  async getEnvironmentsList(hostname:string,githubRepoSlug: string) : Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']>{
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const environments = await octokit.repos.getAllEnvironments({
      owner,
      repo
    });
    return environments.data
  }
}

export class GithubWorkflowsClient implements GithubWorkflowsApi {

  private readonly client : Client;

  constructor(opts: Options) {
    this.client = new Client(opts);
  }

  async listWorkflows(hostname:string, githubRepoSlug:string,branch: string, filter?: string[]): Promise<Workflows[]>{
    return this.client.listWorkflowsResponse(hostname, githubRepoSlug,branch,filter)
  }

  async listBranchesFromRepo(hostname:string, githubRepoSlug: string): Promise<RestEndpointMethodTypes['repos']['listBranches']['response']['data']> {
    return this.client.listBranchesFromRepo(hostname,githubRepoSlug)
  }

  async getBranchDefaultFromRepo(hostname:string,githubRepoSlug:string):Promise<RestEndpointMethodTypes['repos']['get']['response']['data']['default_branch']>{
    return this.client.getBranchDefaultFromRepo(hostname,githubRepoSlug)
  }

  async startWorkflowRun(hostname:string, githubRepoSlug: string, workflowId: number, branch: string, inputs?: {[key: string]: unknown}): Promise<RestEndpointMethodTypes['actions']['createWorkflowDispatch']['response']['status']>{
    return this.client.startWorkflowRun(hostname,githubRepoSlug, workflowId, branch, inputs)
  }

  async stopWorkflowRun(hostname: string, githubRepoSlug: string, runId: number, ): Promise<RestEndpointMethodTypes['actions']['cancelWorkflowRun']['response']['status']> {
    return this.client.stopWorkflowRun(hostname, githubRepoSlug, runId )
  }
  async listJobsForWorkflowRun(hostname:string,githubRepoSlug: string, id: number,pageSize?:number,page?:number): Promise<RestEndpointMethodTypes['actions']['listJobsForWorkflowRun']['response']['data']>{
    return this.client.listJobsForWorkflowRun(hostname,githubRepoSlug, id, pageSize,page)
  }
  async getWorkflowRunById(hostname:string, githubRepoSlug: string, runId: number):Promise<RestEndpointMethodTypes['actions']['getWorkflowRun']['response']['data']> {
    return this.client.getWorkflowRunById(hostname,githubRepoSlug,runId)
  }
  async downloadJobLogsForWorkflowRun(hostname:string, githubRepoSlug: string, jobId: number): Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']>{
    return this.client.downloadJobLogsForWorkflowRun(hostname,githubRepoSlug,jobId)
  }
  async getEnvironmentsList(hostname:string, githubRepoSlug: string):Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']>{
    return this.client.getEnvironmentsList(hostname,githubRepoSlug)
  }
}