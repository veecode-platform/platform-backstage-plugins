import { JobAnnotationProps } from "../../../utils/types";
import { JobsAnnotationActionType } from "./actions";

export const initialJobsAnnotationState : JobAnnotationProps[] = [];

export const JobsAnnotationReducer = (state:JobAnnotationProps[],action: JobsAnnotationActionType):JobAnnotationProps[] => {
    switch (action.type) {
        case 'ADD_JOBS_ANNOTATION':
          return action.payload;
        case 'REMOVE_JOB_ANNOTATION':
          return state.filter(item => item.label !== action.payload);
        case 'UPDATE_JOB_ANNOTATION':
          return state.map(item => item.label === action.payload.label ? action.payload : item)
        default:
          return state;
    }
}