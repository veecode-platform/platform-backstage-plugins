import { RouteResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { RouteDetailsPropsType } from "../state";

export interface RouteListTableProps {
    routes: RouteResponse[];
    loading: boolean;
    setRouteDetails: React.Dispatch<RouteDetailsPropsType>
}

export interface DefaultTableProps {
    children: React.ReactNode
}