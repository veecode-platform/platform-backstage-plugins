import { createContext } from "react";
import { RoutesResponse, ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    allPluginsEnabled: string[] | null;
    listAllPluginsEnabled: (proxyPath: string) => Promise<string[]>;
    getServiceDetails: (serviceIdOrName: string, proxyPath: string) => Promise<ServiceInfoResponse | null>,
    serviceDetails: ServiceInfoResponse | null;
    allRoutes: RoutesResponse[] | null;
    getRoutesList: (serviceIdOrName: string, proxyPath: string) => Promise<RoutesResponse[] | null>
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!)