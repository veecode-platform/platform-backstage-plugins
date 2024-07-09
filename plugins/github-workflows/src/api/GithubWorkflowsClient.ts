import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { GithubWorkflowsApi } from "./GithubWorkflowsApi";
import { readGithubIntegrationConfigs } from '@backstage/integration';


 /**
 * 
 * New implementation
 * @public
 * 
 */ 


export class GithubWorkflowsClient implements GithubWorkflowsApi {
  private readonly configApi: ConfigApi;
  private readonly scmAuthApi: ScmAuthApi;

  constructor(options: { configApi: ConfigApi; scmAuthApi: ScmAuthApi }) {
    this.configApi = options.configApi;
    this.scmAuthApi = options.scmAuthApi;
  }

  private async getOctokit(hostname: string = 'github.com'):Promise<Octokit>{
    const { token } = await this.scmAuthApi.getCredentials({
      url: `https://${hostname}`,
      additionalScope:{
        customScopes:{
          github: ['repo']
        }
      }
    });

    const configs = readGithubIntegrationConfigs(
      this.configApi.get('integrations.github') ?? [],
    );

    const githubIntegrationConfig = configs.find(v => v.host === hostname);
    const baseUrl = githubIntegrationConfig?.apiBaseUrl;
    return new Octokit({auth: token, baseUrl})
  }

  private parseRepo(githubRepoSlug:string) : {repo:string, owner: string}{
    const parse = githubRepoSlug.split('/');
    return {owner: parse[0], repo: parse[1]}
  } 

  async listWorkflows(options:{hostname?: string,githubRepoSlug: string, /* branch: string, filter?: string[]*/}): Promise<RestEndpointMethodTypes['actions']['listRepoWorkflows']['response']['data']>{
    const { hostname, githubRepoSlug } = options;
    const octokit = await this.getOctokit(hostname);
    const {owner, repo} = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.listRepoWorkflows({
      owner,
      repo
    });
    return response.data;
  };

  async listWorkflowRuns(options:{hostname?:string, githubRepoSlug:string, branch:string}):Promise<RestEndpointMethodTypes['actions']['listWorkflowRuns']['response']['data']>{
    const { hostname, githubRepoSlug, branch } = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      branch
    });
    return response.data
  }

  async listBranchesFromRepo(options:{hostname?: string, githubRepoSlug: string}): Promise<RestEndpointMethodTypes['repos']['listBranches']['response']['data']>{
    const { hostname, githubRepoSlug } = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.repos.listBranches({
      owner,
      repo
    });
    return response.data;
  }

  async getBranchDefaultFromRepo(options:{hostname?: string, githubRepoSlug: string}):Promise<RestEndpointMethodTypes['repos']['get']['response']['data']['default_branch']>{
    const { hostname, githubRepoSlug } = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.rest.repos.get({
      owner,
      repo
    });
    return response.data.default_branch;
  }

  async startWorkflowRun(options:{hostname?:string, workflowId: number, githubRepoSlug: string, branch: string, inputs?: {[key: string]: unknown} }): Promise<RestEndpointMethodTypes['actions']['createWorkflowDispatch']['response']['data']>{
    const { hostname, workflowId, githubRepoSlug, branch, inputs } = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: workflowId,
      ref: branch,
      inputs
    }); 
    return response.data
  }
  
  async stopWorkflowRun(options:{hostname?:string, runId: number, githubRepoSlug:string}):Promise<RestEndpointMethodTypes['actions']['cancelWorkflowRun']['response']['status']>{
    const { hostname, runId, githubRepoSlug } = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const response = await octokit.actions.cancelWorkflowRun({
      owner,
      repo,
      run_id: runId
    }); 
    return response.status
  }

  async listJobsForWorkflowRun(options:{hostname?: string, githubRepoSlug: string, id: number,pageSize?:number,page?:number}): Promise<RestEndpointMethodTypes['actions']['listJobsForWorkflowRun']['response']['data']>{
    const { hostname, githubRepoSlug, id, pageSize = 100, page = 0 } = options;
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

  async getWorkflowRunById(options:{ hostname?:string, githubRepoSlug: string, runId: number}):Promise<RestEndpointMethodTypes['actions']['getWorkflowRun']['response']['data']>{
    const { hostname, githubRepoSlug, runId} = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const workflow = await octokit.actions.getWorkflowRun({
      owner,
      repo,
      run_id: runId
    });
    return workflow.data
  }

  async downloadJobLogsForWorkflowRun (options:{hostname?:string, githubRepoSlug: string, jobId: number}): Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']>{
    const { hostname, githubRepoSlug, jobId } = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const workflow = await octokit.actions.downloadJobLogsForWorkflowRun({
      owner,
      repo,
      job_id: jobId,
    });

    return workflow.data;
  }

  async getEnvironmentsList(options:{hostname?:string,githubRepoSlug: string}) : Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']>{
    const { hostname, githubRepoSlug } = options;
    const octokit = await this.getOctokit(hostname);
    const { owner, repo } = this.parseRepo(githubRepoSlug);
    const environments = await octokit.repos.getAllEnvironments({
      owner,
      repo
    });
    return environments.data
  }
}