import { StackActionsType } from "./action";
import { StackStateType } from "./types";

export const initialStackState : StackStateType | null = null;

export const StackReducer = (state: StackStateType | null, action: StackActionsType ) : StackStateType | null  => {
  switch (action.type) {
    case 'ADD_STACK_STATE':
        return action.payload;
    case 'CLEAR_STACK_STATE':
        return null;
    default:
        return state;
  }
}