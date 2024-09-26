/** @public */
export interface WorkflowAnnotation {
  workflow: string;
  label?: string;
  tooltip?: string;
}

/** @public */
export interface Workflow {
    id: number;
    nodeId: string;
    name: string;
    path: string;
    state: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    html_url: string;
    badgeUrl: string;
}

/** @public */
export interface WorkflowResponseFromApi {
    total_count: number;
    workflows: Workflow[];
}

/** @public */
export interface WorkflowRun {  
    id: number;
    name: string;
    head_branch: string;
    event: string;
    status: string;
    conclusion: string;
    run_started_at: string;
    created_at: string;
    updated_at: string;
    actor?: Actor;
    path?:string;
    artifacts_url?:string;
    head_sha?:string;
    repository?: Repository
}

/** @public */
export type Actor = {
  id: number,
  login: string,
  avatar_url: string
}

/** @public */
export type Repository = {
  id: number,
  name: string,
  full_name: string
}

/** @public */
export interface WorkflowRunsResponseFromApi {
    total_count: number;
    workflow_runs: WorkflowRun[];
}

/** @public */
export interface Branch {
    name: string;
    commit?: Commit,
    protected: boolean,
    protection: Protection,
    protection_url: string
}

/** @public */
export interface Protection {
  required_status_checks:{
    enforcement_level: string,
    contexts: string[]
  }
}

/** @public */
export interface Commit {
    sha: string ,
    url: string
}

/** @public */
export interface WorkflowResultsProps {
    id?: number,
    name?: string,
    lastRunId?: number,
    status?: string,
    conclusion?: string,
    source?:  string,
    path?: string,
    parameters?: WorkflowDispatchParameters[] | []
  }

/** @public */
export interface WorkflowDispatchParameters {
    name: string
    description: string
    required: boolean
    type: boolean | number | "choice" | string
    default: string | boolean 
    options?: Array<any>
}

/** @public */
export interface Step {
    name: string;
    status: string;
    conclusion?: string;
    number: number; // starts from 1
    started_at?: string;
    completed_at?: string;
  };
  
  /** @public */
  export interface Job {
    html_url?: string;
    status: string;
    conclusion?: string;
    started_at: string;
    completed_at?: string;
    id: number;
    name: string;
    steps?: Step[];
  };
  
  /** @public */
  export interface Jobs {
    total_count: number;
    jobs: Job[];
  };

