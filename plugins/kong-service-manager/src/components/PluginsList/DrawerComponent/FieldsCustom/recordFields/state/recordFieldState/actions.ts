import { RecordFieldsType } from "../../types";

export const addRecordFieldState = (recordFieldState: RecordFieldsType) => ({
    type: 'ADD_RECORD_FIELDS_STATE',
    payload: recordFieldState
} as const);

export const removeRecordFieldsState = ()=>({
    type: 'REMOVE_RECORD_FIELDS_STATE',
    payload: {}
} as const);

export type RecordFieldsActionType = ReturnType<typeof addRecordFieldState | typeof removeRecordFieldsState>;