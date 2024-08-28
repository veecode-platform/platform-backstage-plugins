import { PluginFieldsResponse } from "../../../../../utils/types";
import { FieldsActionType } from "./actions";

export const initialFieldsState : PluginFieldsResponse[] = [];

export const FieldsReducer = (state: PluginFieldsResponse[], action: FieldsActionType): PluginFieldsResponse[] => {
    switch(action.type){
        case 'ADD_FIELDS':
          return action.payload;
        case 'REMOVE_FIELD':
          return state.filter(item => item.name !== action.payload);
        case 'UPDATE_FIELD':
          return state.map(item => item.name === action.payload.name ? action.payload : item)
        default:
          return state;
    }
}