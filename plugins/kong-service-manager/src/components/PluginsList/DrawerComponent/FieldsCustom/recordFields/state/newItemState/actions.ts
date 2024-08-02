import { NewItemType } from "../../types";

export const addItem = (newItem: NewItemType) => ({
    type: 'ADD_ITEM',
    payload: newItem
} as const);

export const removeItem = ()=>({
    type: 'REMOVE_ITEM',
    payload: {}
} as const);

export type NewItemActionType = ReturnType<typeof addItem | typeof removeItem>;