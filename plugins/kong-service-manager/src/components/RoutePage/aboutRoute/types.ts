import  type { RouteResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface AboutRouteProps {
    error: Error | undefined,
    loading: boolean,
    routeDetails: RouteResponse | null | undefined
}
