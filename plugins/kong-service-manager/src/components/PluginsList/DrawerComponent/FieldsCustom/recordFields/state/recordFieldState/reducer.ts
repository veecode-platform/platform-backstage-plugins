import { RecordFieldsType } from "../../types";

type RecordFieldsAction = 
| {type: 'ADD_RECORD_FIELDS_STATE', payload: RecordFieldsType}
| {type: 'REMOVE_RECORD_FIELDS_STATE', payload: {}};

export const initialRecordFieldState : RecordFieldsType | null = null;

export const RecordFieldReducer = (state: RecordFieldsType | null, action: RecordFieldsAction) : RecordFieldsType | null => {
    switch (action.type){
        case 'ADD_RECORD_FIELDS_STATE':
          return action.payload;
        case 'REMOVE_RECORD_FIELDS_STATE':
          return null;
        default:
          return state;
    }
}
