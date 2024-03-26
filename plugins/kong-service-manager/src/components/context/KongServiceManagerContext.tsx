import { createContext } from "react";
import { AssociatedPluginsResponse, CreatePlugin, PluginPerCategory, PluginCard, PluginFieldsResponse, RoutesResponse, ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    instance: string;
    setInstanceState: (instanceState: string) => void;
    listAllEnabledPlugins: () => Promise<void>;
    getServiceDetails: () => Promise<void>;
    serviceDetails: ServiceInfoResponse | null;
    getRoutesList: () => Promise<void>;
    allRoutes: RoutesResponse[] | null;
    listAssociatedPlugins: () => Promise<void>;
    allAssociatedPlugins: AssociatedPluginsResponse[] | null;
    associatedPluginsName: [] | string[];
    getPluginFields: (pluginName: string) => Promise<PluginFieldsResponse[] | null>;
    enablePlugin: (config: CreatePlugin) => Promise<void | null>;
    disablePlugin: (pluginId: string) => Promise<any>;
    handleToggleDrawer: () => void;
    openDrawer: boolean;
    setPluginState: (data: PluginCard) => void;
    selectedPlugin: PluginCard | null;
    editPlugin: (pluginId: string,config: CreatePlugin) => Promise<void | null>;
    pluginsPerCategory: [] | PluginPerCategory[],
    configState: any;
    setConfigState: React.Dispatch<any>;
    setSearchState: (search: string) => void    
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!);
