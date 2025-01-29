import { AssociatedPluginsResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { AssociatedRoutePluginsActionType } from "./actions";

export const initialAssociatedRoutePluginsState : AssociatedPluginsResponse[] = [];

export const AssociatedRoutePluginsReducer = (state: AssociatedPluginsResponse[], action: AssociatedRoutePluginsActionType) : AssociatedPluginsResponse[] => {
    switch (action.type) {
        case 'ADD_ROUTE_PLUGINS_ASSOCIATED':
            return action.payload;
        case 'REMOVE_ROUTE_PLUGIN_ASSOCIATED':
            return state.filter(item => item.id !== action.payload)
        case 'UPDATE_ROUTE_PLUGINS_ASSOCIATED':
            return state.map(item => (item.name === action.payload.name ?  action.payload : item ));
        default:
            return state;
    }
}