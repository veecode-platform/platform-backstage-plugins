import { RecordStateType } from "../../types";
import { RecordActionType } from "./actions";

export const initialRecordState : RecordStateType | null = null;

export const RecordReducer = (state: RecordStateType | null, action: RecordActionType) : RecordStateType | null => {
    switch (action.type){
        case 'ADD_RECORD_STATE':
          return action.payload;
        case 'REMOVE_RECORD_STATE':
          return null;
        default:
          return state;
    }
}
