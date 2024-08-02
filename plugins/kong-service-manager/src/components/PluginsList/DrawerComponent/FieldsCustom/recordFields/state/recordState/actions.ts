import { RecordStateType } from "../../types";

export const addRecordState = (recordState: RecordStateType) => ({
    type: 'ADD_RECORD_STATE',
    payload: recordState
} as const);

export const removeRecordState = ()=>({
    type: 'REMOVE_RECORD_STATE',
    payload: {}
} as const);

export type RecordActionType = ReturnType<typeof addRecordState | typeof removeRecordState>;