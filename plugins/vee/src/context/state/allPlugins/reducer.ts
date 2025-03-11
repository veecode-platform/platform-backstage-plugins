import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";
import { PluginsActionsType } from "./actions";

export const initialPluginsState : IPlugin[] = [];

export const PluginsReducer = (state:IPlugin[], action:PluginsActionsType):IPlugin[] => {
    switch(action.type){
        case 'SAVE_PLUGINS':
            return action.payload;
        case 'ADD_NEW_PLUGIN':
            return [...state, action.payload]
        case 'UPDATE_PLUGIN': 
            return state.map( plugin => plugin.id === action.payload.id ? action.payload : plugin);
        case 'REMOVE_PLUGIN': 
             return state.filter(p => p.id !== action.payload);
        case 'RESET_PLUGIN_LIST':
             return [];
        default:
            return state
    }
} 