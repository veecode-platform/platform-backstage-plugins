import { Job } from "../../../utils/types";
import { JobsActionType } from "./actions";

export const initialJobsState : Job[] | null = null;

export const JobsReducer = (state:Job[] | null ,action: JobsActionType):Job[] | null=> {
    switch (action.type) {
        case 'ADD_JOBS':
          return action.payload;
        case 'REMOVE_JOB':
          return state ? state.filter(item => item.id !== action.payload): state;
        case 'UPDATE_JOB':
          return state ? state.map(item => item.id === action.payload.id ? action.payload : item) : state;
        default:
          return state;
    }
}