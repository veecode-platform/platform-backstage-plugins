import { createContext } from "react";
import { AssociatedPluginsResponse, CreatePlugin, PluginCard, PluginFieldsResponse, PluginsPerCategoryType, RoutesResponse, ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    instance: string;
    setInstanceState: (instanceState: string) => void;
    listAllEnabledPlugins: () => Promise<PluginsPerCategoryType | never[]>;
    getServiceDetails: (serviceIdOrName: string) => Promise<ServiceInfoResponse | null>;
    serviceDetails: ServiceInfoResponse | null;
    getRoutesList: (serviceIdOrName: string) => Promise<RoutesResponse[] | null>;
    allRoutes: RoutesResponse[] | null;
    listAssociatedPlugins: (serviceIdOrName: string) => Promise<AssociatedPluginsResponse[]|null>;
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
    pluginsPerCategory: PluginsPerCategoryType,
    configState: any,
    setConfigState: React.Dispatch<any>

    
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!);
