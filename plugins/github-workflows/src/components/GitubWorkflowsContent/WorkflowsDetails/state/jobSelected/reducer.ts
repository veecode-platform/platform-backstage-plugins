import { Job } from "../../../../../utils/types";

type JobAction =
| {type: 'ADD_JOB', payload: Job}
| {type: 'REMOVE_JOB', payload: {}};

export const initialJobState : Job | null = null;

export const JobSelectedReducer = (state: Job | null, action: JobAction) : Job | null => {
    switch (action.type){
        case 'ADD_JOB':
          return action.payload;
        case 'REMOVE_JOB':
          return null;
        default:
          return state;
    }
}