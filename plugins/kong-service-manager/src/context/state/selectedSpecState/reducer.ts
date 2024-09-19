import { ISpec } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { SelectedSpecActionType } from "./actions";

export const initialSelectedSpecState : ISpec | null = null;

export const SelectedSpecReducer = (state: ISpec | null , action: SelectedSpecActionType) : ISpec | null => {
    switch (action.type) {
        case 'ADD_SPEC':
            return action.payload;
        case 'REMOVE_SPEC':
            return null;
        default:
            return state;
    }
}