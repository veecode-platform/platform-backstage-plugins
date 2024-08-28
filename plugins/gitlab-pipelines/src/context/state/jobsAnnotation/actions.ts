import { JobAnnotationProps } from "../../../utils/types";

export const addJobsAnnotation = (jobsAnnotation:JobAnnotationProps[]) => ({
    type: 'ADD_JOBS_ANNOTATION',
    payload: jobsAnnotation
} as const);

export const removeJobAnnotation = (label:string)=>({
    type: 'REMOVE_JOB_ANNOTATION',
    payload: label
} as const);

export const updateJobAnnotation = (jobAnnotation:JobAnnotationProps)=>({
    type: 'UPDATE_JOB_ANNOTATION',
    payload: jobAnnotation
} as const);

export type JobsAnnotationActionType = ReturnType<typeof addJobsAnnotation | typeof removeJobAnnotation | typeof updateJobAnnotation>;