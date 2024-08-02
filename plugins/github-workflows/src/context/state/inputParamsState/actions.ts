export const addInputsParams = (inputs:object)=>({
    type: 'ADD_INPUTS',
    payload: inputs
}as const);

export const removeInputsParams = ()=>({
    type: 'REMOVE_INPUTS',
    payload: {}
}as const);

export type InputsParamsActionType = ReturnType<typeof addInputsParams | typeof removeInputsParams>;