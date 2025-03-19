import { FixedOptionActionType } from "./actions";
import { FixedOptionStateType } from "./types";

export const initialFixedOptionState : FixedOptionStateType = { type: '', options:[]}

export const FixedOptionReducer = (state: FixedOptionStateType, action: FixedOptionActionType) : FixedOptionStateType => {
    switch (action.type){
        case 'SET_FIXED_OPTION_DATA':
            return action.payload;
        case 'SET_FIXED_OPTION_TYPE':
            return { ...state, type: action.payload };
        case 'SET_OPTIONS_IN_FIXED_OPTION':
            return { ...state, options: action.payload };
        case 'RESET_FIXED_OPTION_STATE':
            return initialFixedOptionState;
        default:
            return state;
    }
}