import { AssociatedPluginsResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const addPluginsAssociated = (plugins:AssociatedPluginsResponse[]) => ({
    type: 'ADD_PLUGINS_ASSOCIATED',
    payload: plugins
} as const)

export const removePluginAssociated = (plugin: string) => ({
    type: 'REMOVE_PLUGIN_ASSOCIATED',
    payload: plugin
} as const);

export const updatePluginsAssociated = (plugin: AssociatedPluginsResponse) => ({
    type: 'UPDATE_PLUGINS_ASSOCIATED',
    payload: plugin
} as const);


export type AssociatedPluginsActionType = ReturnType<typeof addPluginsAssociated | typeof removePluginAssociated | typeof updatePluginsAssociated>;