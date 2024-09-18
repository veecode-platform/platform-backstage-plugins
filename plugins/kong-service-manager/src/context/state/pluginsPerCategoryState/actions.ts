import { PluginPerCategory } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const addPluginsPerCategory = (data:PluginPerCategory[]) => ({
    type: 'ADD_PLUGINS_PER_CATEGORY',
    payload: data
} as const)

export const updatePluginsPerCategory = (data: PluginPerCategory) => ({
    type: 'UPDATE_PLUGINS_PER_CATEGORY',
    payload: data
} as const);


export type PluginsPerCategoryActionType = ReturnType<typeof addPluginsPerCategory | typeof updatePluginsPerCategory>;