import { EntityAnnotationType } from "../../../utils/types";

export const saveEntityInfo = (value:EntityAnnotationType) => ({
    type: 'SAVE_ENTITY_INFO',
    payload: value
} as const);

export const clearEntityInfo = () => ({
    type: 'CLEAR_ENTITY_INFO',
    payload: null
} as const);

export type EntityInfoActionType = ReturnType<typeof saveEntityInfo | typeof clearEntityInfo >;