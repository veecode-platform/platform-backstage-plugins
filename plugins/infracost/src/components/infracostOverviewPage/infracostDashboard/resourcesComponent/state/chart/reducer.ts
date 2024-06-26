import { ChartItem } from "../../chart/types";


type Action =
  | { type: 'ADD_ITEM'; payload: ChartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_ITEM'; payload: ChartItem };

export const initialChartState: ChartItem[] = [];

export const chartReducer = (state: ChartItem[], action: Action): ChartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_ITEM':
      return state.map(item => (item.id === action.payload.id ? action.payload : item));
    default:
      return state;
  }
};