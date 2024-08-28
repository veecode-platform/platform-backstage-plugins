import { JobVariablesAttributes } from "../../../utils/types";

export const addJobParams = (Jobvariables:JobVariablesAttributes) => ({
    type: 'ADD_JOB_PARAMS',
    payload: Jobvariables
} as const);

export const removeJobParams = ()=>({
    type: 'REMOVE_JOB_PARAMS',
    payload: null
} as const);


export type JobVariablesActionType = ReturnType<typeof addJobParams | typeof removeJobParams>;