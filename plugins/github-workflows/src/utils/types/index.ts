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
export interface WorkflowResponseFromApi {
    total_count: number;
    workflows: Workflow[];
}

export interface WorkflowRun {  
    id: number;
    name: string;
    headBranch: string;
    event: string;
    status: string;
    conclusion: string;
    runStartedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface WorkflowRunsResponseFromApi {
    total_count: number;
    workflow_runs: WorkflowRun[];
}

export interface Branches {
    name: string;
    commit?: Commit,
    protected: boolean;
}

export interface Commit {
    sha: string ,
    url: string
}

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

  export interface WorkflowDispatchParameters {
    name: string
    description: string
    required: boolean
    type: boolean | number | "choice" | string
    default: string | boolean
    options?: Array<any>
}
