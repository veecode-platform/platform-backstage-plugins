import { JobVariablesAttributes } from "../../../utils/types";

export const addJobVariables = (Jobvariables:JobVariablesAttributes) => ({
    type: 'ADD_JOB_VARIABLES',
    payload: Jobvariables
} as const);

export const removeJobVariables = ()=>({
    type: 'REMOVE_JOB_VARIABLES',
    payload: null
} as const);


export type JobVariablesActionType = ReturnType<typeof addJobVariables | typeof removeJobVariables>;