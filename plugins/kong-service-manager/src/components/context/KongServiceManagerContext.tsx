import { createContext } from "react";
import { AssociatedPluginsResponse, CreatePlugin, PluginPerCategory, PluginCard, PluginFieldsResponse, RoutesResponse, ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    instance: string;
    setInstanceState: (instanceState: string) => void;
    setServiceNameOrIdData: (serviceNameOrId: string) => void;
    listAllEnabledPlugins: (serviceIdOrName: string) => Promise<void>;
    getServiceDetails: (serviceIdOrName: string) => Promise<void>;
    serviceDetails: ServiceInfoResponse | null;
    getRoutesList: (serviceIdOrName: string) => Promise<void>;
    allRoutes: RoutesResponse[] | null;
    listAssociatedPlugins: (serviceIdOrName: string) => Promise<void>;
    allAssociatedPlugins: AssociatedPluginsResponse[] | null;
    associatedPluginsName: [] | string[];
    getPluginFields: (pluginName: string) => Promise<PluginFieldsResponse[] | null>;
    enablePlugin: (serviceIdOrName: string, config: CreatePlugin) => Promise<void | null>;
    disablePlugin: (serviceIdOrName: string, pluginId: string) => Promise<any>;
    handleToggleDrawer: () => void;
    openDrawer: boolean;
    setPluginState: (data: PluginCard) => void;
    selectedPlugin: PluginCard | null;
    editPlugin: (serviceIdOrName: string, pluginId: string,config: CreatePlugin) => Promise<void | null>;
    pluginsPerCategory: [] | PluginPerCategory[],
    configState: any;
    setConfigState: React.Dispatch<any>;
    setSearchState: (search: string) => void    
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!);
