import { Job } from "../../../../../utils/types";

export const addJobs = (jobs: Job[]) => ({
    type: 'ADD_JOBS',
    payload: jobs
}as const);

export const removeJob = (id: number) => ({
    type: 'REMOVE_JOB',
    payload: id
}as const);

export const updateJob = (job:Job) => ({
    type: 'UPDATE_JOB',
    payload: job
}as const);

export type JobsActionType = ReturnType<typeof addJobs | typeof removeJob | typeof updateJob>;