import { ChartItem } from "../../chart/types";
import { ChartActionType } from "./actions";

export const initialChartState: ChartItem[] = [];

export const chartReducer = (state: ChartItem[], action: ChartActionType): ChartItem[] => {
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