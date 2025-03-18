import { PluginStateType } from "../updatePlugin/types";

export const setPlugin = (plugin:PluginStateType) => ({
    type: "SET_PLUGIN_DATA",
    payload: plugin
} as const);

export const setPluginName = (pluginName: string) => ({
    type: "SET_PLUGIN_NAME",
    payload: pluginName
}as const);

export const setPluginDocs = (docs: string) => ({
    type: "SET_PLUGIN_DOCS",
    payload: docs
} as const);

export const setPluginAnnotations = (annotations: string[]) => ({
    type: "SET_PLUGIN_ANNOTATIONS",
    payload: annotations
} as const);

export const resetPluginState = () => ({
    type: 'RESET_PLUGIN_STATE',
    payload: null
} as const);

export type PluginActionType = 
ReturnType<
typeof setPlugin |
typeof setPluginName |
typeof setPluginDocs |
typeof setPluginAnnotations |
typeof resetPluginState
>