import { IKongPluginSpec } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { PluginsToSpecActionType } from "./actions";

export const initialPluginsToSpecState : IKongPluginSpec[] = [];

export const PluginsToSpecReducer = (state: IKongPluginSpec[], action: PluginsToSpecActionType) : IKongPluginSpec[] => {
    switch (action.type) {
        case 'ADD_PLUGINS_TO_SPEC':
            return action.payload;
        case 'UPDATE_PLUGINS_TO_SPEC_LIST':
            return [...state, action.payload] as IKongPluginSpec[]
        case 'REMOVE_PLUGIN_TO_SPEC_LIST':
            return state.filter(item => (item.name !== action.payload));
        default:
            return state;
    }
}