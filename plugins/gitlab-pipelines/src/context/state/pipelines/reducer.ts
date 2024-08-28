import { Pipeline } from "../../../utils/types";
import { PipelinesActionType } from "./actions";

export const initialPipelinesState : Pipeline[] | null = null;

export const PipelinesReducer = (state:Pipeline[] | null,action: PipelinesActionType):Pipeline[] | null  => {
    switch (action.type) {
        case 'ADD_PIPELINES':
          return action.payload;
        case 'REMOVE_PIPELINE':
          return state ? state.filter(item => item.id !== action.payload) : state;
        case 'UPDATE_PIPELINE':
          return state ? state.map(item => item.id === action.payload.id ? action.payload : item): state;
        default:
          return state;
    }
}