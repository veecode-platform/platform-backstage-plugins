import { IOption } from "@veecode-platform/backstage-plugin-vee-common";
import { OptionsLisstActionType } from "./actions";
import dataMock from "../../../../../lib/options.json";


export const initialOptionsListState : IOption[] = dataMock;

export const OptionsListReducer = (state: IOption[], action: OptionsLisstActionType) : IOption[] => {
    switch (action.type){
        case 'SET_OPTIONS_LIST':
            return action.payload;
        case 'ADD_NEW_OPTION':
            return [...state, action.payload]
        case 'UPDATE_OPTION_FROM_LIST':
            return state.map(opt => opt.id === action.payload.id ? action.payload : opt);
        case 'REMOVE_OPTION_FROM_LIST':
            return state.filter(opt => opt.id !== action.payload);
        case 'RESET_OPTIONS_LIST_STATE':
            return initialOptionsListState
        default:
            return state;
    }
}