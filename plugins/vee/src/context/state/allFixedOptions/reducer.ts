import { IFixedOptions } from "@veecode-platform/backstage-plugin-vee-common";
import { FixedOptionsActionsType } from "./actions";

export const initialFixedOptionsState : IFixedOptions[] = [];

export const FixedOptionsReducer = (state:IFixedOptions[], action:FixedOptionsActionsType):IFixedOptions[] => {
    switch(action.type){
        case 'SAVE_FIXED_OPTIONS':
            return action.payload;
        case 'CREATE_FIXED_OPTION':
            return [...state, action.payload]
        case 'UPDATE_FIXED_OPTION': 
            return state.map( fixedOption => fixedOption.id === action.payload.id ? action.payload : fixedOption);
        case 'REMOVE_FIXED_OPTION': 
             return state.filter(f => f.id !== action.payload);
        case 'RESET_FIXED_OPTIONS_LIST':
             return initialFixedOptionsState;
        default:
            return state
    }
} 