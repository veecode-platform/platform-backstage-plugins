import { createContext } from "react";
import {  PluginCard, PluginForSpec, PullRequestResponse } from "../utils/types";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, IDefinition, IKongPluginSpec, PluginFieldsResponse, PluginPerCategory, RouteResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import {  PluginsToSpecActionType, SelectedSpecActionType } from "./state";
import { Entity } from "@backstage/catalog-model";


export type KongServiceManagerContextType = {
    entity: Entity;
    instance: string;
    kongSpecs: string[] | null | undefined,
    setInstanceState: (instanceState: string) => void;
    listAllEnabledPlugins: () => Promise<PluginPerCategory[] | null>;
    getServiceDetails: () => Promise<ServiceInfoResponse | null>;
    getRoutesList: () => Promise<RouteResponse[] | null>;
    listAssociatedPlugins: () => Promise<AssociatedPluginsResponse[]>;
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
    getSpecs: () => Promise<IDefinition[] | null >;
    selectedSpecState: IDefinition | null;
    selectedSpecDispatch: React.Dispatch<SelectedSpecActionType>;
    listAllPluginsForSpec: () => Promise<PluginForSpec[]>;
    pluginsToSpecState: IKongPluginSpec[];
    pluginsToSpecDispatch: React.Dispatch<PluginsToSpecActionType>;
    applyKongPluginsToSpec: (specName:string,title: string, message: string, location: string, plugins: IKongPluginSpec[]) => Promise<PullRequestResponse>
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!);
