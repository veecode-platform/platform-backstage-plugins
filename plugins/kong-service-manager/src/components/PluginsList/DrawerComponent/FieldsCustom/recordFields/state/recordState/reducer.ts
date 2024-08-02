import { RecordStateType } from "../../types";

type RecordAction = 
| {type: 'ADD_RECORD_STATE', payload: RecordStateType}
| {type: 'REMOVE_RECORD_STATE', payload: {}};

export const initialRecordState : RecordStateType | null = null;

export const RecordReducer = (state: RecordStateType | null, action: RecordAction) : RecordStateType | null => {
    switch (action.type){
        case 'ADD_RECORD_STATE':
          return action.payload;
        case 'REMOVE_RECORD_STATE':
          return null;
        default:
          return state;
    }
}
