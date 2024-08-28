import { GitlabPipelinesStatus } from "../enums/GitlabPipelinesStatus"

export interface PipelineListResponse {
    id: number,
    iid: number,
    project_id: number | string,
    sha: string,
    ref: string,
    status: string,
    source: string,
    created_at: Date,
    updated_at: Date,
    web_url: string,
    name?: string |null
}

export interface PipelineResponse {
    id: number,
    iid: number,
    project_id: number | string,
	sha: string,
	ref: string,
	status: string,
	source: string,
	created_at: Date,
	updated_at: Date,
	web_url: string,
    before_sha: string,
    tag: boolean,
    yaml_errors: string | null,
    user:{
        id: number | string,
        username: string,
        name: string,
        state: string,
        avatar_url: string,
        web_url: string,
    },
    starterd_at: Date | null, 
    finished_at: Date | null,
    committed_at: Date | null,
	duration: string | null,
	queued_duration: number | null,
	coverage: null,
	detailed_status: {
		icon: string,
		text: string,
		label: string,
		group: string,
		tooltip: string,
		has_details: boolean,
		details_path: string,
		illustration: string | null,
		favicon: string
	},
    name: string | null
}

export interface Pipeline {
    id: number,
    projectId: number | string,
    sha: string,
    ref: string,
    status: string,
    source: string,
    createdAt: Date ,
    updatedAt: Date,
    webUrl: string,
    name?: string | null
}

export interface ListBranchResponse {
		name: string,
		commit: Commit,
		merged: boolean,
		protected: boolean,
		developers_can_push: boolean,
		developers_can_merge: boolean,
		can_push: boolean,
		default: boolean,
		web_url: string
}

export interface Branch {
    name: string,
    default: boolean,
    web_url: string,
    protected: boolean
}

export interface ListJobsResponse {
    id: number,
    status: string,
    stage: string,
    name: string,
    ref: string,
    tag: boolean,
    coverage: string | null,
    allow_failure: boolean,
    created_at: Date,
    started_at: Date | null,
    finished_at: Date | null,
    erased_at: Date | null,
    duration: string | number | null,
    queued_duration: string | null,
    user: User,
    commit: Commit,
    pipeline: Pipeline,
    web_url: string,
    project: {
        ci_job_token_scope_enabled: boolean
    },
    artifacts: Artifacts[] | [],
    runner: Runner | null,
    artifacts_expire_at: PipelineResponse | null,
    tag_list: []
}

export interface Job {
    id: number,
    status: string,
    stage: string,
    name: string,
    ref: string,
    tag: boolean,
    pipeline: Pipeline,
    web_url: string,
    artifacts: Artifacts[] | [],
    runner: Runner | null
}

export interface JobVariablesAttributes {
key: string,
value: string
}

export interface JobsParamsProps {
  jobId: number,
  key: string,
  value: string
}

export interface Commit {
        id: string,
        short_id: string,
        created_at: Date,
        parent_ids: string[],
        title: string,
        message: string,
        author_name: string,
        author_email: string,
        authored_date: string,
        committer_name: string,
        committer_email: string,
        committed_date: string,
        trailers: {},
        web_url: string,
}


export interface User {
    id: number | string,
    username: string,
    name: string,
    state: string,
    avatar_url: string,
    web_url: string,
    created_at: Date,
    bio: string,
    location: string,
    public_email: string,
    skype: string,
    linkedin: string,
    twitter: string,
    discord: string,
    website_url: string,
    organization: string,
    job_title: string,
    pronouns: string,
    bot: boolean,
    work_information: string | null,
    followers: number,
    following: number,
    local_time: string | null
}

export interface Artifacts {
    file_type: string,
    size: number,
    filename: string,
    file_format: string | null
}

export interface Runner {
    id: number | string,
    description: string,
    ip_address: number | string,
    active: boolean,
    paused: boolean,
    is_shared: boolean,
    runner_type: string,
    name: string,
    online: boolean,
    status: string
}

export interface JobAnnotationProps {
    id: string,
    label: string,
    var: string,
    status: GitlabPipelinesStatus
  }
export interface VariablesParams {
    key: string,
    value: string
}