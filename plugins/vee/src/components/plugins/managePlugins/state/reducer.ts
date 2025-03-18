import { AddPluginStateType } from "./types";
import { PluginActionType } from "./actions";

export const initialPluginState : AddPluginStateType = { pluginId: '',name: '', docs: '', annotations:[]}

export const PluginReducer = (state: AddPluginStateType, action: PluginActionType) : AddPluginStateType => {
    switch (action.type){
        case 'SET_PLUGIN_DATA':
            return action.payload;
        case 'SET_PLUGIN_NAME':
            return { ...state, name: action.payload };
        case 'SET_PLUGIN_DOCS':
            return { ...state, docs: action.payload };
        case 'SET_PLUGIN_ANNOTATIONS':
            return {...state, annotations: action.payload};
        case 'RESET_PLUGIN_STATE':
            return initialPluginState;
        default:
            return state;
    }
}