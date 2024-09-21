import { createContext } from "react";
import {  PluginCard, PluginForSpec, PullRequestResponse } from "../utils/types";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, IKongPluginSpec, ISpec, PluginFieldsResponse, PluginPerCategory, RouteResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import {  PluginsToSpecActionType, SelectedSpecActionType } from "./state";


export type KongServiceManagerContextType = {
    instance: string;
    setInstanceState: (instanceState: string) => void;
    listAllEnabledPlugins: () => Promise<PluginPerCategory[] | null>;
    getServiceDetails: () => Promise<ServiceInfoResponse | null>;
    getRoutesList: () => Promise<RouteResponse[] | null>;
    listAssociatedPlugins: () => Promise<void>;
    allAssociatedPluginsState: AssociatedPluginsResponse[] | null;
    associatedPluginsName: [] | string[];
    getPluginFields: (pluginName: string) => Promise<PluginFieldsResponse[] | null>;
    enablePlugin: (config: CreatePlugin) => Promise<void | null>;
    disablePlugin: (pluginId: string) => Promise<any>;
    handleToggleDrawer: () => void;
    openDrawer: boolean;
    setPluginState: (data: PluginCard) => void;
    selectedPluginState: PluginCard | null;
    editPlugin: (pluginId: string,config: CreatePlugin) => Promise<void | null>;
    pluginsPerCategoryState: [] | PluginPerCategory[],
    configState: any;
    setConfigState: React.Dispatch<any>;
    setSearchState: (search: string) => void;
    searchTerm: string,
    createRoute: (config: CreateRoute) => Promise<void | null>;
    editRoute: (routeNameOrId: string, config: CreateRoute) => Promise<void | null>;
    removeRoute: (routeNameOrId: string) => Promise<void | null>;
    getRoute:  (routeNameOrId: string) => Promise<RouteResponse | null>;
    getSpecs: () => Promise<ISpec[] | null >;
    selectedSpecState: ISpec | null;
    selectedSpecDispatch: React.Dispatch<SelectedSpecActionType>;
    listAllPluginsForSpec: (specName: string) => Promise<PluginForSpec[]>;
    pluginsToSpecState: IKongPluginSpec[];
    pluginsToSpecDispatch: React.Dispatch<PluginsToSpecActionType>;
    applyKongPluginsToSpec: (specName: string, title: string, message: string, location: string, plugins: IKongPluginSpec[]) => Promise<PullRequestResponse>
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!);
