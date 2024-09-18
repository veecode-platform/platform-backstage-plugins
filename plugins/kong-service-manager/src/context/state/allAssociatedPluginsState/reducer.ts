import { AssociatedPluginsResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { AssociatedPluginsActionType } from "./actions";

export const initialAssociatedPluginsState : AssociatedPluginsResponse[] = [];

export const AssociatedPluginsReducer = (state: AssociatedPluginsResponse[], action: AssociatedPluginsActionType) : AssociatedPluginsResponse[] => {
    switch (action.type) {
        case 'ADD_PLUGINS_ASSOCIATED':
            return action.payload;
        case 'REMOVE_PLUGIN_ASSOCIATED':
            return state.filter(item => item.id !== action.payload)
        case 'UPDATE_PLUGINS_ASSOCIATED':
            return state.map(item => (item.name === action.payload.name ?  action.payload : item ));
        default:
            return state;
    }
}