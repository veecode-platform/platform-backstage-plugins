import { RouteDetailsProps } from "../../../../../../utils/types";
import { RouteDetailsPropsType } from "./actions";

export const initialRouteDetailsState : RouteDetailsProps | null = null;

export const RouteDetailsReducer = (
    state: RouteDetailsProps | null, 
    action: RouteDetailsPropsType 
  ): RouteDetailsProps | null => {
    switch (action.type) {
      case 'ADD_ROUTE_DETAILS':
        return action.payload; 
      case 'REMOVE_ROUTE_DETAILS':
        return null;
      default:
        return state;
    }
  };