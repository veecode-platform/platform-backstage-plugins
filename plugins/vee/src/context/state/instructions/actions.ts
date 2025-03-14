import { PluginListProps } from "../../../../utils/types";

export const setStackId = (stackId:string) => ({
    type: "SET_STACK_ID",
    payload: stackId
}as const);

export const setPlugins = (plugins: PluginListProps[]) => ({
    type: "SET_PLUGINS",
    payload: plugins
} as const);

export const setTemplateName = (templateName: string) => ({
    type: "SET_TEMPLATE_NAME",
    payload: templateName
} as const);

export const setAdditionalInfo = (additionalInfo:string) => ({
    type: "SET_ADDITIONAL_INFO",
    payload: additionalInfo
} as const);

export const resetInstructions = () => ({
    type: 'RESET_INSTRUCTIONS',
    payload: { stackId: '', templateName: ''}
} as const);

export type InstructionsActionType = 
ReturnType<
typeof setStackId |
typeof setPlugins |
typeof setTemplateName |
typeof setAdditionalInfo |
typeof resetInstructions
>