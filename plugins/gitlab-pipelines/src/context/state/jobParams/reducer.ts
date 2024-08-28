import { JobVariablesAttributes } from "../../../utils/types";

type JobVariablesAction = 
| {type: 'ADD_JOB_VARIABLES', payload: JobVariablesAttributes}
| {type: 'REMOVE_JOB_VARIABLES', payload: null}

export const initialJobVariablesState : JobVariablesAttributes | null = null;

export const LatestJobVariablesReducer = (state:JobVariablesAttributes,action: JobVariablesAction):JobVariablesAttributes | null => {
    switch (action.type) {
        case 'ADD_JOB_VARIABLES':
          return action.payload;
        case 'REMOVE_JOB_VARIABLES':
          return null;
        default:
          return state;
    }
}