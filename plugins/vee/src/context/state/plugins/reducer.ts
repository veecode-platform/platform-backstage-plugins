import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";
import { PluginListActionType } from "./actions";

export const initialPluginListState : IPlugin[] = [];

export const PluginListReducer = (state: IPlugin[], action: PluginListActionType ) : IPlugin[] => {
    // eslint-disable-next-line no-console
    console.log("Ação recebida:", action);
    switch(action.type){
        case 'SAVE_PLUGINS_LIST':
            return action.payload;
        case 'ADD_PLUGIN':
            return [...state, action.payload];
        case 'UPDATE_PLUGINS_LIST':
            return state.map( plugin => plugin.id === action.payload.id ? action.payload : plugin);
        case 'DELETE_PLUGIN':
            return state.filter(plugin => plugin.id !== action.payload);
        default:
            return state
    } 
}


