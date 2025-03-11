import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";

export const savePlugins = (plugins:IPlugin[]) => ({
    type: 'SAVE_PLUGINS',
    payload: plugins
} as const);

export const addNewPlugin = (plugin:IPlugin) => ({
    type: 'ADD_NEW_PLUGIN',
    payload: plugin
} as const);

export const updatePluginFromlist = (plugin:IPlugin) => ({
    type: 'UPDATE_PLUGIN',
    payload: plugin
} as const);

export const removePluginFromList = (pluginId:string) => ({
    type: 'REMOVE_PLUGIN',
    payload: pluginId
} as const);

export const resetPluginLis = () => ({
    type: 'RESET_PLUGIN_LIST',
    payload: []
} as const);

export type PluginsActionsType = ReturnType<typeof savePlugins | typeof addNewPlugin | typeof updatePluginFromlist | typeof removePluginFromList | typeof resetPluginLis>