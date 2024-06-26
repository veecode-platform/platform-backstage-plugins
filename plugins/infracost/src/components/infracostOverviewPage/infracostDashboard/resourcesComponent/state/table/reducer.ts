import { ResourcesTableProps } from "../../types";


type Action =
  | { type: 'ADD_ROW'; payload: ResourcesTableProps }
  | { type: 'REMOVE_ROW'; payload: string }
  | { type: 'UPDATE_ROW'; payload: ResourcesTableProps };

export const initialResourcesTableState: ResourcesTableProps[] = [];

export const resourcesTableReducer = (state: ResourcesTableProps[], action: Action): ResourcesTableProps[] => {
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