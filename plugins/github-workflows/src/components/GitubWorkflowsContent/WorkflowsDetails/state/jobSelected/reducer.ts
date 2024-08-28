import { Job } from "../../../../../utils/types";
import { JobActionType } from "./actions";

export const initialJobState : Job | null = null;

export const JobSelectedReducer = (state: Job | null, action: JobActionType) : Job | null => {
    switch (action.type){
        case 'ADD_JOB':
          return action.payload;
        case 'REMOVE_JOB':
          return null;
        default:
          return state;
    }
}