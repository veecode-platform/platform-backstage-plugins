import { OptionProps } from "./types";

export const addOptions = (options:OptionProps[]) => ({
    type: 'ADD_OPTIONS',
    payload: options
} as const);

export const removeOptions = (label: string) => ({
    type: 'REMOVE_OPTION',
    payload: label
} as const);

export const updateOptions = (option: OptionProps) => ({
    type: 'UPDATE_OPTIONS',
    payload: option
}as const);

export type OptionsActionType = ReturnType<typeof addOptions | typeof removeOptions | typeof updateOptions>;