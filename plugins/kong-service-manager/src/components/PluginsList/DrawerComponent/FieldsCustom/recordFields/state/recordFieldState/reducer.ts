import { RecordFieldsType } from "../../types";
import { RecordFieldsActionType } from "./actions";

export const initialRecordFieldState : RecordFieldsType | null = null;

export const RecordFieldReducer = (state: RecordFieldsType | null, action: RecordFieldsActionType) : RecordFieldsType | null => {
    switch (action.type){
        case 'ADD_RECORD_FIELD_STATE':
          return action.payload;
        case 'REMOVE_RECORD_FIELD_STATE':
          return null;
          case 'UPDATE_RECORD_FIELD_STATE':
           return { ...state, [action.payload.key]: action.payload.value } as RecordFieldsType ;
        default:
          return state;
    }
}
