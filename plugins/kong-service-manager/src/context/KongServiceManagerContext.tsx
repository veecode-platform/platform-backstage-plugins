import { createContext } from "react";
import {  PluginCard, PluginForSpec, PullRequestResponse } from "../utils/types";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, HttpMethod, IDefinition, IKongPluginSpec, PluginFieldsResponse, PluginPerCategory, RouteResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import {  AssociatedPluginsActionType, AssociatedRoutePluginsActionType, PluginsPerCategoryActionType, PluginsToSpecActionType, SelectedSpecActionType } from "./state";
import { Entity } from "@backstage/catalog-model";


export type KongServiceManagerContextType = {
    entity: Entity;
    serviceName: string | null;
    instance: string;
    kongSpecs: string[] | null | undefined;
    routeId: string | null;
    setRouteId: React.Dispatch<React.SetStateAction<string|null>>;
    isRoute: boolean;
    setIsRoute: React.Dispatch<React.SetStateAction<boolean>>;
    setInstanceState: (instanceState: string) => void;
    allAssociatedPluginsState: AssociatedPluginsResponse[] | null;
    associatedPluginsDispatch: React.Dispatch<AssociatedPluginsActionType>;
    allAssociatedRoutePluginsState: AssociatedPluginsResponse[];
    associatedRoutePluginsDispatch: React.Dispatch<AssociatedRoutePluginsActionType>;
    associatedPluginsName: [] | string[];
    associatedRoutePluginsName: [] | string[];
    handleToggleDrawer: () => void;
    openDrawer: boolean;
    setPluginState: (data: PluginCard) => void;
    selectedPluginState: PluginCard | null;
    pluginsPerCategoryState: [] | PluginPerCategory[],
    pluginsPerCategoryDispatch: React.Dispatch<PluginsPerCategoryActionType>;
    configState: any;
    setConfigState: React.Dispatch<any>;
    setSearchState: (search: string) => void;
    searchTerm: string,
    selectedSpecState: IDefinition | null;
    selectedSpecDispatch: React.Dispatch<SelectedSpecActionType>;
    pluginsToSpecState: IKongPluginSpec[];
    pluginsToSpecDispatch: React.Dispatch<PluginsToSpecActionType>;
    getServiceDetails: () => Promise<ServiceInfoResponse | null>;
    listAllEnabledPlugins: () => Promise<PluginPerCategory[] | null>;
    listAssociatedPlugins: () => Promise<AssociatedPluginsResponse[]>;
    enablePlugin: (config: CreatePlugin) => Promise<void | null>;
    editPlugin: (pluginId: string, config: CreatePlugin) => Promise<void | null>;
    disablePlugin: (pluginId: string) => Promise<void | null>;
    getPluginFields: (pluginName: string) => Promise<PluginFieldsResponse[] | null>
    getRoutesList: () => Promise<RouteResponse[] | null>;
    getRoute: (routeNameOrId: string) => Promise<RouteResponse | null>;
    createRoute: (config: CreateRoute) => Promise<any>;
    editRoute: (config: CreateRoute) => Promise<void | null>;
    removeRoute: () => Promise<void | null>;
    listAllEnabledRoutePlugins: () => Promise<PluginPerCategory[] | null>;
    listAssociatedRoutePlugins: () => Promise<AssociatedPluginsResponse[]>;
    enablePluginToRoute: ( config: CreatePlugin) => Promise<any>;
    editPluginFromRoute: ( pluginId: string, config: CreatePlugin) => Promise<any>;
    disabledPluginFromRoute: (rpluginId: string) => Promise<any>;
    getSpecs: () => Promise<any[] | null>;
    listAllServicePluginsForSpec: () => Promise<PluginForSpec[]>;
    applyKongServicePluginsToSpec: (specName: string, title: string, message: string, location: string, plugins: IKongPluginSpec[]) => Promise<PullRequestResponse>;
    listAllRoutePluginsForSpec: (path: string, method: HttpMethod) => Promise<PluginForSpec[]>;
    applyKongRoutePluginsToSpec: (specName: string, title: string, message: string, location: string, path: string, method: HttpMethod, plugins: IKongPluginSpec[]) => Promise<PullRequestResponse>
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!);
