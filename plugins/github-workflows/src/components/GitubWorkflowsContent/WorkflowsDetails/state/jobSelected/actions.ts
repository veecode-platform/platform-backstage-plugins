import { Job } from '../../../../../utils/types'

export const addJob = (job:Job) => ({
    type: 'ADD_JOB',
    payload: job
}as const);

export const removeJob = () => ({
    type: 'REMOVE_JOB',
    payload: {}
});

export type JobActionType = ReturnType<typeof addJob | typeof removeJob>