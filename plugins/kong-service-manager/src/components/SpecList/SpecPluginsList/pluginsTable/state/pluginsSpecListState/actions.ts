import { PluginForSpec } from "../../../../../../utils/types";

export const addPluginsToList = (plugins: PluginForSpec[])=>({
    type: 'ADD_PLUGINS_TO_LIST',
    payload: plugins
} as const);

export const updatePluginFromList = (plugins: PluginForSpec)=>({
    type: 'UPDATE_PLUGIN_FROM_LIST',
    payload: plugins
} as const);

export const removePluginFromList = (pluginName: string)=>({
    type: 'REMOVE_PLUGIN_FROM_LIST',
    payload: pluginName
} as const);

export type PluginsSpecListType = ReturnType<typeof addPluginsToList | typeof updatePluginFromList| typeof  removePluginFromList>