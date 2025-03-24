import type { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";
import type { StackStateType } from "./types";

export const addStackState = (stack:StackStateType) => ({
  type: 'SET_STACK_DATA',
  payload: stack
} as const);

export const setStackName = (stackName:string) => ({
  type: 'SET_STACK_NAME',
  payload: stackName
});

export const setStackSource = (source:string) => ({
  type: 'SET_STACK_SOURCE',
  payload: source
});

export const setStackPlugins = (plugins:IPlugin[]) => ({
  type: 'SET_STACK_PLUGINS',
  payload: plugins
} as const)


export const resetStackState = () => ({
  type: 'RESET_STACK_STATE',
  payload: null
} as const);

export type StackActionsType = 
ReturnType<
typeof addStackState | 
typeof setStackName |
typeof setStackSource |
typeof setStackPlugins |
typeof resetStackState
>