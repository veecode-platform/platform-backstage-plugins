import { NewItemType } from "../../types";

type NewItemAction = 
| {type: 'ADD_ITEM', payload: NewItemType}
| {type: 'REMOVE_ITEM', payload: {}};

export const initialNewItemState : NewItemType | null = null;

export const NewItemReducer = (state: NewItemType | null, action: NewItemAction) : NewItemType | null => {
    switch (action.type){
        case 'ADD_ITEM':
          return action.payload;
        case 'REMOVE_ITEM':
          return null;
        default:
          return state;
    }
}
