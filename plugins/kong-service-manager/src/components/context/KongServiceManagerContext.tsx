import { createContext } from "react";
import { AssociatedPluginsResponse, CreatePlugin, PluginFieldsResponse, RoutesResponse, ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    listAllEnabledPlugins: (proxyPath: string) => Promise<string[]>;
    allEnabledPlugins: string[] | null;
    getServiceDetails: (serviceIdOrName: string, proxyPath: string) => Promise<ServiceInfoResponse | null>;
    serviceDetails: ServiceInfoResponse | null;
    getRoutesList: (serviceIdOrName: string, proxyPath: string) => Promise<RoutesResponse[] | null>;
    allRoutes: RoutesResponse[] | null;
    listAssociatedPlugins: (serviceIdOrName: string, proxyPath: string) => Promise<AssociatedPluginsResponse[]|null>;
    allAssociatedPlugins: AssociatedPluginsResponse[] | null;
    getPluginFields: (pluginName: string, proxyPath: string) => Promise<PluginFieldsResponse[] | null>;
    enablePlugin: (serviceIdOrName: string, config: CreatePlugin, proxyPath: string) => Promise<any>;
    disablePlugin: (serviceIdOrName: string, pluginId: string, proxyPath: string) => Promise<any>;
    handleToggleModal: () => void;
    openModal: boolean;
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!)