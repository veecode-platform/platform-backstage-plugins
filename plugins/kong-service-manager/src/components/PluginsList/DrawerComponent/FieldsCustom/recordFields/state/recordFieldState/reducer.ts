import { RecordFieldsType } from "../../types";

type RecordFieldsAction = 
| {type: 'ADD_RECORD_FIELDS_STATE', payload: RecordFieldsType}
| {type: 'REMOVE_RECORD_FIELDS_STATE', payload: {}}
| {type: 'UPDATE_RECORD_FIELD_STATE', payload: {key: string, value: any} }

export const initialRecordFieldState : RecordFieldsType | null = null;

export const RecordFieldReducer = (state: RecordFieldsType | null, action: RecordFieldsAction) : RecordFieldsType | null => {
    switch (action.type){
        case 'ADD_RECORD_FIELDS_STATE':
          return action.payload;
        case 'REMOVE_RECORD_FIELDS_STATE':
          return null;
          case 'UPDATE_RECORD_FIELD_STATE':
           return { ...state, [action.payload.key]: action.payload.value } as RecordFieldsType ;
        default:
          return state;
    }
}
