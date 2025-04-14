import { TemplateOutputProps } from "../../../utils/types";
import { TemplateOutputActionsType } from "./actions";

export const initialTemplateOutputState : TemplateOutputProps | null = null;

export const TemplateOutputReducer = (state: TemplateOutputProps | null, action: TemplateOutputActionsType) : TemplateOutputProps | null => {
    switch(action.type){
        case 'SET_TEMPLATE_OUTPUT':
           return action.payload
        case 'RESET_TEMPLATE_OUTPUT':
           return null
        default:
           return state
    }
}