import { Job, Step } from "../../../utils/types"

export type WorkflowDetailsProps = {
    runStartedAt: string,
    conclusion: string,
    status: string,
    updatedAt: string,
    avatar: string,
    author: string,
    branch: string,
    headCommit: string,
    repo: string
}

export type JobsComponentProps = {
    path:string,
    event: string,
    jobs: Job[]
}

export type JobModalProps = {
    job: Job,
    show: boolean,
    handleCloseModal: () => void
}

export type HeaderComponentProps = {
    jobName: string,
    jobStatus: string,
    jobConclusion: string,
    jobStartedAt: string,
    jobCompletedAt: string
}

export type StepsListComponentsProps = {
    steps: Step[]
};


export type JobLogsComponentProps = {
    jobId: number,
    running: boolean
}