import { TemplateOutputProps } from "../../../utils/types";

export const setTemplateOutput = (templateOutput: TemplateOutputProps) => ({
    type: 'SET_TEMPLATE_OUTPUT',
    payload: templateOutput
} as const);

export const resetTemplateOutput = () => ({
    type: 'RESET_TEMPLATE_OUTPUT',
    payload: null
} as const);

export type TemplateOutputActionsType = ReturnType<
typeof setTemplateOutput |
typeof resetTemplateOutput
>