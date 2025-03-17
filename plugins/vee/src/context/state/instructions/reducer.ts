import { InstructionsProps } from "../../../utils/types";
import { InstructionsActionType } from "./actions";

export const initialInstructionsState : InstructionsProps = {stackInfo: {name:'', id: '', source: ''}, templateName:''};

export const InstructionsReducer = (state: InstructionsProps, action: InstructionsActionType) : InstructionsProps => {
    switch (action.type){
        case 'SET_STACK_ID':
            return { ...state, stackInfo: action.payload };
        case 'SET_PLUGINS':
            return { ...state, plugins: action.payload };
        case 'SET_TEMPLATE_NAME':
            return {...state, templateName: action.payload};
        case 'SET_ADDITIONAL_INFO':
            return {...state, additionalInfo: action.payload};
        case 'RESET_INSTRUCTIONS':
            return initialInstructionsState
        default:
            return state;
    }
}