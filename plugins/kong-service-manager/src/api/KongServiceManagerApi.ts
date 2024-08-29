import { createApiRef } from "@backstage/core-plugin-api";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, PluginFieldsResponse, PluginPerCategory, RouteResponse, RoutesResponse, ServiceInfoResponse } from "../utils/types";
import { DiscoveryApi } from "@backstage/core-plugin-api";

export type Options = {
    discoveryApi: DiscoveryApi;
    proxyPath?: string;
};

export const kongServiceManagerApiRef = createApiRef<KongServiceManagerApi>({
    id: 'plugin.kongservicemanager',
});

export interface KongServiceManagerApi {
    getEnabledPlugins(proxyPath: string): Promise<string[]>;

    getPluginFields(workspace:string,pluginName: string, proxyPath: string): Promise<PluginFieldsResponse[]>;

    getServiceAssociatedPlugins(workspace:string,serviceIdOrName: string, proxyPath: string): Promise<AssociatedPluginsResponse[]>;

    createServicePlugin(workspace:string, serviceIdOrName: string, config: CreatePlugin, proxyPath: string): Promise<any>;

    editServicePlugin(workspace:string,serviceIdOrName: string, pluginId: string, config: CreatePlugin, proxyPath: string): Promise<any>;

    removeServicePlugin(workspace:string,serviceIdOrName: string, pluginId: string, proxyPath: string): Promise<any>;

    getRoutesFromService(workspace:string,serviceIdOrName: string, proxyPath: string): Promise<RoutesResponse[]>;

    getRouteFromService(workspace: string, serviceName: string, routeNameOrId: string, instance: string): Promise<RouteResponse>;

    createRouteFromService(workspace:string, serviceIdOrName: string, config: CreateRoute, proxyPath?: string | undefined ): Promise<any>;

    editRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute, proxyPath?: string | undefined ): Promise<any>;

    removeRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, proxyPath?: string | undefined ): Promise<any>;

    getServiceInfo(workspace:string,serviceIdOrName: string, proxyPath: string): Promise<ServiceInfoResponse>;

    getAllEnabledPlugins(workspace:string,serviceIdOrName: string, proxyPath: string, searchFilter?: string): Promise<PluginPerCategory[]>;


}