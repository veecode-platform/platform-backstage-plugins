import { AssociatedPluginsResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const addRoutePluginsAssociated = (plugins:AssociatedPluginsResponse[]) => ({
    type: 'ADD_ROUTE_PLUGINS_ASSOCIATED',
    payload: plugins
} as const)

export const removeRoutePluginAssociated = (plugin: string) => ({
    type: 'REMOVE_ROUTE_PLUGIN_ASSOCIATED',
    payload: plugin
} as const);

export const updateRoutePluginsAssociated = (plugin: AssociatedPluginsResponse) => ({
    type: 'UPDATE_ROUTE_PLUGINS_ASSOCIATED',
    payload: plugin
} as const);


export type AssociatedRoutePluginsActionType = ReturnType<typeof addRoutePluginsAssociated | typeof removeRoutePluginAssociated | typeof updateRoutePluginsAssociated>;