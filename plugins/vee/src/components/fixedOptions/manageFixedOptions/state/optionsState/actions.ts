import { IOption } from "@veecode-platform/backstage-plugin-vee-common";


export const setOptionsList = (options:IOption[]) => ({
    type: "SET_OPTIONS_LIST",
    payload: options
} as const);

export const addNewOptionToList = (option: IOption) => ({
    type: "ADD_NEW_OPTION",
    payload: option
} as const);

export const updateOptionFromList = (option: IOption) => ({
    type: "UPDATE_OPTION_FROM_LIST",
    payload: option
} as const);

export const removeOptionFromList = (optionId: string) => ({
    type: "REMOVE_OPTION_FROM_LIST",
    payload: optionId
} as const);

export const resetOptionsListState = () => ({
    type: 'RESET_OPTIONS_LIST_STATE',
    payload: null
} as const);

export type OptionsLisstActionType = 
ReturnType<
typeof setOptionsList |
typeof addNewOptionToList |
typeof updateOptionFromList |
typeof removeOptionFromList |
typeof resetOptionsListState 
>