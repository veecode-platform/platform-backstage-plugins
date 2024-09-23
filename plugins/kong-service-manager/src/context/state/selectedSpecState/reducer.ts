import { IDefinition } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { SelectedSpecActionType } from "./actions";

export const initialSelectedSpecState : IDefinition | null = null;

export const SelectedSpecReducer = (state: IDefinition | null , action: SelectedSpecActionType) : IDefinition | null => {
    switch (action.type) {
        case 'ADD_SPEC':
            return action.payload;
        case 'REMOVE_SPEC':
            return null;
        default:
            return state;
    }
}