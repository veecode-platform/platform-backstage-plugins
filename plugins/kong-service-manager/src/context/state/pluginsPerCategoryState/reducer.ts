import { PluginPerCategory } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { PluginsPerCategoryActionType } from "./actions";

export const initialPluginsPerCategoryState : PluginPerCategory[] = [];

export const PluginsPerCategoryReducer = (state: PluginPerCategory[], action: PluginsPerCategoryActionType) : PluginPerCategory[] => {
    switch (action.type) {
        case 'ADD_PLUGINS_PER_CATEGORY':
            return action.payload;
        case 'UPDATE_PLUGINS_PER_CATEGORY':
            return state.map(item => (item.category === action.payload.category ?  action.payload : item ));
        default:
            return state;
    }
}