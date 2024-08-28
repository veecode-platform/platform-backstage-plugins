import { InputFieldType } from "../../types";
import { FieldsActionType } from "./actions";

export const initialInputFieldsState : InputFieldType[] = [];

export const InputFieldsReducer = (state: InputFieldType[], action: FieldsActionType): InputFieldType[] => {
    switch(action.type){
        case 'ADD_INPUT_FIELDS':
          return action.payload;
        case 'REMOVE_INPUT_FIELD':
          return state.filter(item => item.name !== action.payload);
        case 'UPDATE_INPUT_FIELD':
          return state.map(item => item.name === action.payload.name ? action.payload : item)
        default:
          return state;
    }
}