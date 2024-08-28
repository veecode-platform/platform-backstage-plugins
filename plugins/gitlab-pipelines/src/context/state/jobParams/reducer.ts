import { JobVariablesAttributes } from "../../../utils/types";
import { JobVariablesActionType } from "./actions";

export const initialJobParamsState : JobVariablesAttributes | null = null;

export const JobParamsReducer = (state:JobVariablesAttributes | null ,action: JobVariablesActionType):JobVariablesAttributes | null => {
    switch (action.type) {
        case 'ADD_JOB_PARAMS':
          return action.payload;
        case 'REMOVE_JOB_PARAMS':
          return null;
        default:
          return state;
    }
}