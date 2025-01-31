import { RouteResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface RouteListTableProps {
    routes: RouteResponse[];
    loading: boolean
}

export interface DefaultTableProps {
    children: React.ReactNode
}