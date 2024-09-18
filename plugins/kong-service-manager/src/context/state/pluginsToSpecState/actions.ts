import { IKongPluginSpec } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const addPluginsToSpec = (plugins:IKongPluginSpec[]) => ({
    type: 'ADD_PLUGINS_TO_SPEC',
    payload: plugins
} as const)

export const updatePluginsToSpecList = (plugin: IKongPluginSpec) => ({
    type: 'UPDATE_PLUGINS_TO_SPEC_LIST',
    payload: plugin
} as const);

export const removePluginToSpecList = (pluginName: string) => ({
    type: 'REMOVE_PLUGIN_TO_SPEC_LIST',
    payload: pluginName
} as const);


export type PluginsToSpecActionType = ReturnType<typeof addPluginsToSpec | typeof updatePluginsToSpecList  | typeof removePluginToSpecList>;