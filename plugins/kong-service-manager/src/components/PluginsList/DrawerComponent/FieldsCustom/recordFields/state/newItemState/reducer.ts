import { NewItemType } from "../../types";
import { NewItemActionType } from "./actions";

export const initialNewItemState : NewItemType | null = null;

export const NewItemReducer = (state: NewItemType | null, action: NewItemActionType) : NewItemType | null => {
    switch (action.type){
        case 'ADD_ITEM':
          return action.payload;
        case 'REMOVE_ITEM':
          return null;
        default:
          return state;
    }
}
