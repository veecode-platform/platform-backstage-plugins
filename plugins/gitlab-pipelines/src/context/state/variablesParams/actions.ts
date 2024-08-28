import { VariablesParams } from "../../../utils/types";

export const addVariables = (variables:VariablesParams[]) => ({
    type: 'ADD_VARIABLES',
    payload: variables
} as const);

export const removeVariable = (value:string)=>({
    type: 'REMOVE_VARIABLE',
    payload: value
} as const);

export const updateVariable = (variable:VariablesParams)=>({
    type: 'UPDATE_VARIABLE',
    payload: variable
} as const);

export type VariablesActionType = ReturnType<typeof addVariables | typeof removeVariable | typeof updateVariable>;