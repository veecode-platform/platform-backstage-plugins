import { JobAnnotationProps } from "../../../utils/types";
import { JobsAnnotationActionType } from "./actions";

export const initialJobsAnnotationState : JobAnnotationProps[] | null = null;

export const JobsAnnotationReducer = (state:JobAnnotationProps[] | null,action: JobsAnnotationActionType):JobAnnotationProps[] | null => {
    switch (action.type) {
        case 'ADD_JOBS_ANNOTATION':
          return action.payload;
        case 'REMOVE_JOB_ANNOTATION':
          return state ? state.filter(item => item.label !== action.payload) : state;
        case 'UPDATE_JOB_ANNOTATION':
          return state ? state.map(item => item.label === action.payload.label ? action.payload : item) : state;
        default:
          return state;
    }
}