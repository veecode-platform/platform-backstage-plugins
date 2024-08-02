import { InputFieldType } from "../../types";

type InputFieldAction =
|{type: 'ADD_INPUT_FIELDS', payload: InputFieldType[]}
|{type: 'REMOVE_INPUT_FIELD', payload: string}
|{type: 'UPDATE_INPUT_FIELD', payload: InputFieldType};

export const initialFieldsState : InputFieldType[] = [];

export const FieldsReducer = (state: InputFieldType[], action: InputFieldAction): InputFieldType[] => {
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