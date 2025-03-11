import { IStack } from "@veecode-platform/backstage-plugin-vee-common";

export const saveStackSelected = (stack:IStack) => ({
    type: 'SAVE_STACK',
    payload: stack
} as const);

export const clearStackSelected = () => ({
    type: 'CLEAR_STACK',
    payload: null
} as const);

export type StackSelectedActionsType = ReturnType<typeof saveStackSelected | typeof clearStackSelected>