import { createContext } from "react";
import { AssociatedPluginsResponse, RoutesResponse, ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    listAllEnabledPlugins: (proxyPath: string) => Promise<string[]>;
    allEnabledPlugins: string[] | null;
    getServiceDetails: (serviceIdOrName: string, proxyPath: string) => Promise<ServiceInfoResponse | null>;
    serviceDetails: ServiceInfoResponse | null;
    getRoutesList: (serviceIdOrName: string, proxyPath: string) => Promise<RoutesResponse[] | null>;
    allRoutes: RoutesResponse[] | null;
    listAssociatedPlugins: (serviceIdOrName: string, proxyPath: string) => Promise<AssociatedPluginsResponse[]|null>;
    allAssociatedPlugins: AssociatedPluginsResponse[] | null;
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!)