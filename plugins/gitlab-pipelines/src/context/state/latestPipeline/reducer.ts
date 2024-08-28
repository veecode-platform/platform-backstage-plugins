import { Pipeline } from "../../../utils/types";
import { LatestPipelinesActionType } from "./actions";

export const initialLatestPipelineState : Pipeline | null = null;

export const LatestPipelineReducer = (state:Pipeline | null,action: LatestPipelinesActionType):Pipeline | null => {
    switch (action.type) {
        case 'ADD_LATEST_PIPELINE':
          return action.payload;
        case 'REMOVE_PIPELINE':
          return null;
        default:
          return state;
    }
}