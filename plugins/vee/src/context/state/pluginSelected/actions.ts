import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";

export const savePluginSelected = (plugin:IPlugin) => ({
    type: 'SAVE_PLUGIN',
    payload: plugin
} as const);

export const clearPluginSelected = () => ({
    type: 'CLEAR_PLUGIN',
    payload: null
} as const);

export type PluginSelectedActionsType = ReturnType<typeof savePluginSelected | typeof clearPluginSelected>