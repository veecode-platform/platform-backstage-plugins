import { Pipeline } from "../../../utils/types";

type PipelinesAction = 
| {type: 'ADD_PIPELINES', payload: Pipeline[]}
| {type: 'REMOVE_PIPELINE', payload: number}
| { type: 'UPDATE_PIPELINE', payload: Pipeline};

export const initialPipelinesState : Pipeline[] = [];

export const PipelinesReducer = (state:Pipeline[],action: PipelinesAction):Pipeline[] => {
    switch (action.type) {
        case 'ADD_PIPELINES':
          return action.payload;
        case 'REMOVE_PIPELINE':
          return state.filter(item => item.id !== action.payload);
        case 'UPDATE_PIPELINE':
          return state.map(item => item.id === action.payload.id ? action.payload : item)
        default:
          return state;
    }
}