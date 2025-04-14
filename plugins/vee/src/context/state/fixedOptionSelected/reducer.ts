import { IFixedOptions } from "@veecode-platform/backstage-plugin-vee-common";
import { FixedOptionSelectedActionsType } from "./actions";

export const initialFixedOptionSelectedState : IFixedOptions | null = null;

export const FixedOptionSelectedReducer = (state:IFixedOptions|null, action:FixedOptionSelectedActionsType):IFixedOptions | null => {
    switch(action.type){
        case 'SAVE_FIXED_OPTION_SELECTED':
            return action.payload;
        case 'CLEAR_FIXED_OPTION_SELECTED':
            return null;
        default:
            return state
    }
} 