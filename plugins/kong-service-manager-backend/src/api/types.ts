import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, PluginFieldsResponse, PluginPerCategory, RouteResponse, RoutesResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface KongServiceManagerApi {
    getEnabledPlugins(instanceName: string,serviceIdOrName: string, searchFilter?: string): Promise<PluginPerCategory[]>;

    getPluginFields(instanceName: string, pluginName: string): Promise<PluginFieldsResponse[]>;

    getServiceAssociatedPlugins(instanceName: string, serviceIdOrName: string): Promise<AssociatedPluginsResponse[]>;

    createServicePlugin(instanceName: string, serviceIdOrName: string, config: CreatePlugin): Promise<any>;

    editServicePlugin(instanceName: string, serviceIdOrName: string, pluginId: string, config: CreatePlugin): Promise<any>;

    removeServicePlugin(instanceName: string, serviceIdOrName: string, pluginId: string): Promise<any>;

    getRoutesFromService(instanceName: string,serviceIdOrName: string): Promise<RoutesResponse[]>;

    getRouteFromService(instanceName: string, serviceName: string, routeNameOrId: string): Promise<RouteResponse>;

    createRouteFromService(instanceName: string, serviceIdOrName: string, config: CreateRoute): Promise<any>;

    editRouteFromService(instanceName: string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute): Promise<any>;

    removeRouteFromService(instanceName: string, serviceIdOrName: string, routeIdOrName: string): Promise<any>;

    getServiceInfo(instanceName: string, serviceIdOrName: string): Promise<ServiceInfoResponse>;

}