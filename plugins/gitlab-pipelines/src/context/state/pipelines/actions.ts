import { Pipeline } from "../../../utils/types";

export const addPipelines = (pipelines:Pipeline[]) => ({
    type: 'ADD_PIPELINES',
    payload: pipelines
} as const);

export const removePipeline = (pipelineId:number)=>({
    type: 'REMOVE_PIPELINE',
    payload: pipelineId
} as const);

export const updatePipeline = (pipeline:Pipeline)=>({
    type: 'UPDATE_PIPELINE',
    payload: pipeline
} as const);

export type PipelinesActionType = ReturnType<typeof addPipelines | typeof removePipeline | typeof updatePipeline>;