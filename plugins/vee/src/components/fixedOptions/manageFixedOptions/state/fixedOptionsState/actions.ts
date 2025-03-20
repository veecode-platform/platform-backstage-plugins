import { IOption } from "@veecode-platform/backstage-plugin-vee-common";
import { FixedOptionStateType } from "../types";


export const setFixedOption = (fixedOption:FixedOptionStateType) => ({
    type: "SET_FIXED_OPTION_DATA",
    payload: fixedOption
} as const);

export const setFixedOptionType = (type: string) => ({
    type: "SET_FIXED_OPTION_TYPE",
    payload: type
}as const);

export const setOptions = (options: IOption[]) => ({
    type: "SET_OPTIONS_IN_FIXED_OPTION",
    payload: options
} as const);

export const resetFixedOptionState = () => ({
    type: 'RESET_FIXED_OPTION_STATE',
    payload: null
} as const);

export type FixedOptionActionType = 
ReturnType<
typeof setFixedOption |
typeof setFixedOptionType |
typeof setOptions |
typeof resetFixedOptionState 
>