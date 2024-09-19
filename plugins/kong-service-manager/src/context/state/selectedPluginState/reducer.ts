import { PluginCard } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { SelectedPluginActionType } from "./actions";

export const initialSelectedPluginState : PluginCard | null = null;

export const SelectedPluginReducer = (state: PluginCard | null , action: SelectedPluginActionType) : PluginCard | null => {
    switch (action.type) {
        case 'ADD_SELECTED_PLUGIN':
            return action.payload;
        case 'REMOVE_SELECTED_PLUGIN':
            return null;
        default:
            return state;
    }
}