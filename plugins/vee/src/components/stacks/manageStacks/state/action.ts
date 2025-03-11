import { StackStateType } from "./types";

export const addStackState = (stack:StackStateType) => ({
  type: 'ADD_STACK_STATE',
  payload: stack
} as const);

export const clearStackState = () => ({
  type: 'CLEAR_STACK_STATE',
  payload: null
} as const);

export type StackActionsType = ReturnType<typeof addStackState | typeof clearStackState>