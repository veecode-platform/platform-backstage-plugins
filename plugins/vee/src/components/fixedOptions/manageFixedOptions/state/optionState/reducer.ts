import { OptionActionType } from "./actions";
import { OptionStateProps } from "./types";

export const initialOptionState : OptionStateProps = {label: '', prompt: ''};

export const OptionReducer = (state: OptionStateProps, action: OptionActionType ) : OptionStateProps => {
   switch (action.type) {
    case 'SET_OPTION_DATA':
        return action.payload;
    case 'SET_OPTION_LABEL':
        return {...state, label: action.payload};
    case 'SET_OPTION_PROMPT':
        return {...state, prompt: action.payload}
    case 'RESET_OPTION'   :
        return initialOptionState;
    default:
        return state;
   }
}