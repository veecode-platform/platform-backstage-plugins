import { IFixedOptions } from "@veecode-platform/backstage-plugin-vee-common";

export const saveFixedOptions = (fixedOptions:IFixedOptions[]) => ({
    type: 'SAVE_FIXED_OPTIONS',
    payload: fixedOptions
} as const);

export const createFixedOption = (fixedOption:IFixedOptions) => ({
    type: 'CREATE_FIXED_OPTION',
    payload: fixedOption
} as const);

export const updateFixedOptionFromlist = (fixedOption:IFixedOptions) => ({
    type: 'UPDATE_FIXED_OPTION',
    payload: fixedOption
} as const);

export const removeFixedOptionFromList = (fixedOptionId:string) => ({
    type: 'REMOVE_FIXED_OPTION',
    payload: fixedOptionId
} as const);

export const resetFixedOptionsList = () => ({
    type: 'RESET_FIXED_OPTIONS_LIST',
    payload: []
} as const);

export type FixedOptionsActionsType = 
ReturnType<
typeof saveFixedOptions | 
typeof createFixedOption | 
typeof updateFixedOptionFromlist | 
typeof removeFixedOptionFromList | 
typeof resetFixedOptionsList
>