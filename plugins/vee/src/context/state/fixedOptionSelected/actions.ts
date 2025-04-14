import { IFixedOptions } from "@veecode-platform/backstage-plugin-vee-common";

export const saveFixedOptionSelected = (fixedOption:IFixedOptions) => ({
    type: 'SAVE_FIXED_OPTION_SELECTED',
    payload: fixedOption
} as const);

export const clearFixedOptionSelected = () => ({
    type: 'CLEAR_FIXED_OPTION_SELECTED',
    payload: null
} as const);

export type FixedOptionSelectedActionsType = ReturnType<typeof saveFixedOptionSelected | typeof clearFixedOptionSelected>