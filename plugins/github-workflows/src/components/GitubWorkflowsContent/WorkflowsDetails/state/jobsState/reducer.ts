import { Job } from "../../../../../utils/types";

type JobsAction = 
|{type: 'ADD_JOBS', payload: Job[]}
|{type: 'REMOVE_JOB', payload: number}
|{type: 'UPDATE_JOB', payload: Job};

export const initialJobsState : Job[] = [];

export const JobsReducer = (state:Job[],action:JobsAction) : Job[] => {
    switch (action.type) {
        case 'ADD_JOBS':
          return action.payload;       
        case 'REMOVE_JOB':
          return state.filter(item => item.id !== action.payload)
        case 'UPDATE_JOB':
          return state.map(item => item.id === action.payload.id ? action.payload : item);
        default:
          return state;
    }

}