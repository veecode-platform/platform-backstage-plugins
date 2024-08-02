import { OptionProps } from "./types";

type Action =
| {type: 'ADD_OPTIONS', payload: OptionProps[]}
| {type: 'REMOVE_OPTION', payload: string}
| {type: 'UPDATE_OPTIONS', payload: OptionProps};

export const initialOptionsState : OptionProps[] = [];

export const optionsReducer = (state:OptionProps[], action: Action) : OptionProps[] => {
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