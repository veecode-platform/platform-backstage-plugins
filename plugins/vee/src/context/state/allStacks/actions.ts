import { IStack } from "@veecode-platform/backstage-plugin-vee-common";

export const saveStacks = (stacks:IStack[]) => ({
    type: 'SAVE_STACKS',
    payload: stacks
} as const);

export const addNewStack = (stack:IStack) => ({
    type: 'ADD_NEW_STACK',
    payload: stack
} as const);

export const updateStackFromlist = (stack:IStack) => ({
    type: 'UPDATE_STACK',
    payload: stack
} as const);

export const removeStackFromList = (stackId:string) => ({
    type: 'REMOVE_STACK',
    payload: stackId
} as const);

export const resetStackList = () => ({
    type: 'RESET_STACK_LIST',
    payload: []
} as const);

export type StacksActionsType = ReturnType<typeof saveStacks | typeof addNewStack | typeof updateStackFromlist | typeof removeStackFromList | typeof resetStackList>