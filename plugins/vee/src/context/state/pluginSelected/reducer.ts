import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";
import { PluginSelectedActionsType } from "./actions";

export const initialPluginSelectedState : IPlugin | null = null;

export const PluginSelectedReducer = (state:IPlugin|null, action:PluginSelectedActionsType):IPlugin | null => {
    switch(action.type){
        case 'SAVE_PLUGIN':
            return action.payload;
        case 'CLEAR_PLUGIN':
            return null;
        default:
            return state
    }
} 