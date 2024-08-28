import { JobVariablesAttributes } from "../../../utils/types";
import { JobVariablesActionType } from "./actions";

export const initialJobVariablesState : JobVariablesAttributes | null = null;

export const JobVariablesReducer = (state:JobVariablesAttributes | null ,action: JobVariablesActionType):JobVariablesAttributes | null => {
    switch (action.type) {
        case 'ADD_JOB_VARIABLES':
          return action.payload;
        case 'REMOVE_JOB_VARIABLES':
          return null;
        default:
          return state;
    }
}