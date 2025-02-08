import { RouteDetailsProps } from "../../../../../../utils/types";


export const addRouteDetails = (routeParams: RouteDetailsProps) => ({
    type: 'ADD_ROUTE_DETAILS',
    payload: routeParams
} as const);

export const removeRouteDetails = () => ({
    type: 'REMOVE_ROUTE_DETAILS',
    payload: null
} as const);

export type RouteDetailsPropsType =  | ReturnType<typeof addRouteDetails> | ReturnType<typeof removeRouteDetails>;