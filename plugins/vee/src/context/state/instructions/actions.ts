import { PluginListProps, StackInstructiosProps } from "../../../utils/types";

export const setStackInfo = (stackInfo: StackInstructiosProps) => ({
    type: "SET_STACK_ID",
    payload: stackInfo
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
typeof setStackInfo |
typeof setPlugins |
typeof setTemplateName |
typeof setAdditionalInfo |
typeof resetInstructions
>