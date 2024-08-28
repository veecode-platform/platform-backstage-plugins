import { Pipeline } from "../../../utils/types";

type LatestPipelineAction = 
| {type: 'ADD_LATEST_PIPELINE', payload: Pipeline}
| {type: 'REMOVE_PIPELINE', payload: null}

export const initialLatestPipelineState : Pipeline | null = null;

export const LatestPipelineReducer = (state:Pipeline,action: LatestPipelineAction):Pipeline | null => {
    switch (action.type) {
        case 'ADD_LATEST_PIPELINE':
          return action.payload;
        case 'REMOVE_PIPELINE':
          return null;
        default:
          return state;
    }
}