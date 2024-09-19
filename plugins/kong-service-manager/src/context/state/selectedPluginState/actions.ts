import { PluginCard } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const addSelectedPlugin = (plugin:PluginCard) => ({
    type: 'ADD_SELECTED_PLUGIN',
    payload: plugin
} as const)

export const removeSelectedPlugin = () => ({
    type: 'REMOVE_SELECTED_PLUGIN',
    payload: null
} as const);


export type SelectedPluginActionType = ReturnType<typeof addSelectedPlugin | typeof removeSelectedPlugin >;