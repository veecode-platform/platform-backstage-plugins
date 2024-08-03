import { InputFieldType } from "../../types";

export const addInputFields = (inputFields:InputFieldType[])=>({
    type: 'ADD_INPUT_FIELDS',
    payload: inputFields
} as const);

export const removeInputField = (fieldName : string)=>({
    type: 'REMOVE_INPUT_FIELD',
    payload: fieldName
}as const);

export const updateInputField = (inputField: InputFieldType)=>({
    type: 'UPDATE_INPUT_FIELD',
    payload: inputField
}as const);

export type FieldsActionType = ReturnType<typeof addInputFields | typeof removeInputField | typeof updateInputField>;