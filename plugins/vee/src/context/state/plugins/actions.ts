import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";

export const savePluginList = (plugins: IPlugin[]) => ({
 type: 'SAVE_PLUGINS_LIST',
 payload: plugins
} as const);

export const addPluginToList = (plugin: IPlugin) => ({
  type: 'ADD_PLUGIN',
  payload: plugin
} as const);

export const updatePluginInList = (plugin: IPlugin) => ({
  type: 'UPDATE_PLUGINS_LIST',
  payload: plugin
} as const);

export const removePluginFromList = (pluginId: string) => ({
    type: 'DELETE_PLUGIN',
    payload: pluginId
} as const);

export type PluginListActionType = ReturnType<typeof savePluginList | typeof addPluginToList | typeof updatePluginInList | typeof removePluginFromList>;