import { OptionStateProps } from "./types";

export const setOption = (option: OptionStateProps) => ({
    type: "SET_OPTION_DATA",
    payload: option
} as const);

export const setOptionLabel = (label: string) => ({
    type: "SET_OPTION_LABEL",
    payload: label
} as const);

export const setOptionPrompt = (prompt: string) => ({
    type: "SET_OPTION_PROMPT",
    payload: prompt
} as const);

export const resetOption = () => ({
    type: "RESET_OPTION",
    payload: {label: '', prompt: ''}
} as const)

export type OptionActionType = ReturnType<
typeof setOption |
typeof setOptionLabel |
typeof setOptionPrompt |
typeof resetOption
> 