import { EntityAnnotationType } from "../../../utils/types";
import { EntityInfoActionType } from "./actions";

export const initialEntityInfoState : EntityAnnotationType | null = null;

export const EntityInfoReducer = (state: EntityAnnotationType | null, action: EntityInfoActionType ) : EntityAnnotationType | null => {
    switch(action.type){
        case 'SAVE_ENTITY_INFO':
            return action.payload;
        case 'CLEAR_ENTITY_INFO':
            return null;
        default:
            return state;
    }
}