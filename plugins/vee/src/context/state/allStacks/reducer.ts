import { IStack } from "@veecode-platform/backstage-plugin-vee-common";
import { StacksActionsType } from "./actions";

export const initialStacksState : IStack[] = [];

export const StacksReducer = (state:IStack[], action:StacksActionsType):IStack[] => {
    switch(action.type){
        case 'SAVE_STACKS':
            return action.payload;
        case 'ADD_NEW_STACK':
            return [...state, action.payload]
        case 'UPDATE_STACK': 
            return state.map( stack => stack.id === action.payload.id ? action.payload : stack);
        case 'REMOVE_STACK': 
             return state.filter(s => s.id !== action.payload);
        case 'RESET_STACK_LIST':
             return [];
        default:
            return state
    }
} 