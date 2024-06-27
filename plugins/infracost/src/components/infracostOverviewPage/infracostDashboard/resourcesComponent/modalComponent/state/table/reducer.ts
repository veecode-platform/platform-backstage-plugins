import { ResourceDetailsTableProps } from "../../types";


type Action =
  | { type: 'ADD_ROW'; payload: ResourceDetailsTableProps }
  | { type: 'REMOVE_ROW'; payload: string }
  | { type: 'UPDATE_ROW'; payload: ResourceDetailsTableProps };

export const initialResourceDetailsTableState: ResourceDetailsTableProps[] = [];

export const resourceDetailsTableReducer = (state: ResourceDetailsTableProps[], action: Action): ResourceDetailsTableProps[] => {
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