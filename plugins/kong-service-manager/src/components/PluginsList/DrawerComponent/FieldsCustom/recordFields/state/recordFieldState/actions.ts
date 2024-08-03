import { RecordFieldsType } from "../../types";

export const addRecordFieldState = (recordFieldState: RecordFieldsType) => ({
    type: 'ADD_RECORD_FIELD_STATE',
    payload: recordFieldState
} as const);

export const removeRecordFieldsState = ()=>({
    type: 'REMOVE_RECORD_FIELD_STATE',
    payload: {}
} as const);

export const updateRecordFieldState = (key: string,value: any) => ({
    type: 'UPDATE_RECORD_FIELD_STATE',
    payload: { key, value },
} as const);
  

export type RecordFieldsActionType = ReturnType<typeof addRecordFieldState | typeof removeRecordFieldsState | typeof updateRecordFieldState>;