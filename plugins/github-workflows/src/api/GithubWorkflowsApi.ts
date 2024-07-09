import { createApiRef } from '@backstage/core-plugin-api';
import { RestEndpointMethodTypes } from '@octokit/rest';

export const githubWorkflowsApiRef = createApiRef<GithubWorkflowsApi>({
    id: 'plugin.githubworkflows',
});

export interface GithubWorkflowsApi {
    /**
    * list workflows
    * possible to filter by workflow file name
    * Ex filter => ["application-dashboards.yaml", "another.yaml"]
    */
    listWorkflows(options:{hostname?: string,githubRepoSlug:string /* , branch: string, filter?: string[] */}): Promise<RestEndpointMethodTypes['actions']['listRepoWorkflows']['response']['data']>;
    /**
    *  List workflows run
    */
    listWorkflowRuns(options:{hostname?:string, githubRepoSlug:string, branch: string }): Promise<RestEndpointMethodTypes['actions']['listWorkflowRuns']['response']['data']>;
    /**
    * list branches from a repository
    */
    listBranchesFromRepo(options:{hostname?:string,githubRepoSlug:string}): Promise<RestEndpointMethodTypes['repos']['listBranches']['response']['data']>;
    /**
    * get branch default from a repository
    */
    getBranchDefaultFromRepo(options:{hostname?:string,githubRepoSlug: string}): Promise<RestEndpointMethodTypes['repos']['get']['response']['data']['default_branch']>;
    /**
    * dispatch a run from a branch of a workflow
    */
    startWorkflowRun(options:{hostname?:string, workflowId: number, githubRepoSlug: string, branch: string, inputs?: {[key: string]: unknown} }): Promise<RestEndpointMethodTypes['actions']['createWorkflowDispatch']['response']['data']>;
    /**
    * stop a run from a worflow
    */
    stopWorkflowRun(options: {hostname?: string, runId: number, githubRepoSlug: string}): Promise<RestEndpointMethodTypes['actions']['cancelWorkflowRun']['response']['status']>;
    /**
    * list all jobs from a workflow run
    */
    listJobsForWorkflowRun(options:{ hostname?:string,githubRepoSlug: string, id: number,pageSize?:number,page?:number}): Promise<RestEndpointMethodTypes['actions']['listJobsForWorkflowRun']['response']['data']>;
    /**
    *  get a workflow by id
    */
    getWorkflowRunById(options:{ hostname?:string, githubRepoSlug: string, runId: number}):Promise<RestEndpointMethodTypes['actions']['getWorkflowRun']['response']['data']>;
    /**
    *  download job logs
    */
    downloadJobLogsForWorkflowRun(options:{hostname?:string, githubRepoSlug: string, jobId: number}): Promise<RestEndpointMethodTypes['actions']['downloadJobLogsForWorkflowRun']['response']['data']>
    /**
    *  list all environments
    */
    getEnvironmentsList(options:{hostname?:string,githubRepoSlug: string}) : Promise<RestEndpointMethodTypes['repos']['getAllEnvironments']['response']['data']>
}