import { IStack } from "@veecode-platform/backstage-plugin-vee-common";
import { StackSelectedActionsType } from "./actions";

export const initialStackSelectedState : IStack | null = null;

export const StackSelectedReducer = (state:IStack|null, action:StackSelectedActionsType):IStack | null => {
    switch(action.type){
        case 'SAVE_STACK':
            return action.payload;
        case 'CLEAR_STACK':
            return null;
        default:
            return state
    }
} 