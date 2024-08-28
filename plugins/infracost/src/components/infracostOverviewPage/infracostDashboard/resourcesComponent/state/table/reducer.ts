import { ResourcesTableProps } from "../../types";
import { ResourcesTableActionType } from "./actions";

export const initialResourcesTableState: ResourcesTableProps[] = [];

export const resourcesTableReducer = (state: ResourcesTableProps[], action: ResourcesTableActionType): ResourcesTableProps[] => {
  switch (action.type) {
    case 'ADD_ROW':
      return [...state, action.payload];
    case 'REMOVE_ROW':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_ROW':
      return state.map(item => (item.id === action.payload.id ? action.payload : item));
    default:
      return state;
  }
};