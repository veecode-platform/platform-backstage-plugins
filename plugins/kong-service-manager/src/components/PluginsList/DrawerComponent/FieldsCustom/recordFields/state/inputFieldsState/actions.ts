import { InputFieldType } from "../../types";

export const addInputFields = (fields:InputFieldType[])=>({
    type: 'ADD_INPUT_FIELDS',
    payload: fields
} as const);

export const removeInputField = (fieldName : string)=>({
    type: 'REMOVE_INPUT_FIELD',
    payload: fieldName
}as const);

export const updateInputField = (field: InputFieldType)=>({
    type: 'UPDATE_INPUT_FIELD',
    payload: field
}as const);

export type FieldsActionType = ReturnType<typeof addInputFields | typeof removeInputField | typeof updateInputField>;