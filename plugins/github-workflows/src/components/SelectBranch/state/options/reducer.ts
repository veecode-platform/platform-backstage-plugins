import { OptionsActionType } from "./actions";
import { OptionProps } from "./types";

export const initialOptionsState : OptionProps[] = [];

export const optionsReducer = (state:OptionProps[], action: OptionsActionType) : OptionProps[] => {
    switch (action.type) {
        case 'ADD_OPTIONS':
         return action.payload;
        case 'REMOVE_OPTION':
         return state.filter(item => item.label !== action.payload); 
        case 'UPDATE_OPTIONS':
         return state.map(item => (item.label === action.payload.label ? action.payload : item))
        default:
         return state
    }
}