import { PluginForSpec } from "../../../../../../utils/types";
import { PluginsSpecListType } from "./actions";

export const initialPluginsSpecListState : PluginForSpec[] = [];

export const PluginsSpecListReducer = (state: PluginForSpec[], action: PluginsSpecListType) : PluginForSpec[] => {
    switch (action.type) {
        case 'ADD_PLUGINS_TO_LIST':
            return action.payload;
        case 'UPDATE_PLUGIN_FROM_LIST':
            return state.map(item => item.name === action.payload.name ? action.payload : item);
        case 'REMOVE_PLUGIN_FROM_LIST':
            return state.filter(item => (item.name !== action.payload));
        default:
            return state;
    }
}