import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";
import { StackActionsType } from "./action";
import { StackStateType } from "./types";

export const initialStackState : StackStateType | null = null;

export const StackReducer = (state: StackStateType | null, action: StackActionsType ) : StackStateType | null  => {
  switch (action.type) {
    case 'SET_STACK_DATA':
        return action.payload as StackStateType;
    case 'SET_STACK_NAME':
        return {...state, name: action.payload};
    case 'SET_STACK_SOURCE':
        return {...state, source: action.payload};
    case 'SET_STACK_PLUGINS':
        return {...state, plugins: action.payload as IPlugin[]}
    case 'CLEAR_STACK_STATE':
        return null;
    default:
        return state;
  }
}