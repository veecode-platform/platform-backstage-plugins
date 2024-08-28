import { Pipeline } from "../../../utils/types";

export const addLatestPipeline = (pipeline:Pipeline) => ({
    type: 'ADD_LATEST_PIPELINE',
    payload: pipeline
} as const);

export const removeLatestPipeline = ()=>({
    type: 'REMOVE_PIPELINE',
    payload: null
} as const);

export type LatestPipelinesActionType = ReturnType<typeof addLatestPipeline | typeof removeLatestPipeline >;