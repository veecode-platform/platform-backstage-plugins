import { JsonValue } from "@backstage/types";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, PluginFieldsResponse, RouteResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface KongServiceManagerApi {
    getServiceInfo(instanceName: string, serviceIdOrName: string): Promise<ServiceInfoResponse>;
    getEnabledPlugins(instanceName: string): Promise<string[]>;
    getPluginFields(instanceName: string, pluginName: string): Promise<PluginFieldsResponse[]>;
    getServiceAssociatedPlugins(instanceName: string, serviceIdOrName: string): Promise<AssociatedPluginsResponse[]>;
    createServicePlugin(instanceName: string, serviceIdOrName: string, config: CreatePlugin): Promise<any>;
    editServicePlugin(instanceName: string, serviceIdOrName: string, pluginId: string, config: CreatePlugin): Promise<any>;
    removeServicePlugin(instanceName: string, serviceIdOrName: string, pluginId: string): Promise<any>;
    getRoutesFromService(instanceName: string,serviceIdOrName: string): Promise<RouteResponse[]>;
    getRouteFromService(instanceName: string, serviceName: string, routeNameOrId: string): Promise<RouteResponse>;
    createRouteFromService(instanceName: string, serviceIdOrName: string, config: CreateRoute): Promise<any>;
    editRouteFromService(instanceName: string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute): Promise<any>;
    removeRouteFromService(instanceName: string, serviceIdOrName: string, routeIdOrName: string): Promise<any>;
    getRouteAssociatedPlugins(instanceName: string, routeId: string): Promise<AssociatedPluginsResponse[]>;
    createRoutePlugin(instanceName: string, routeIdOrName: string, config: CreatePlugin): Promise<any>;
    editRoutePlugin(instanceName: string, routeIdOrName: string, pluginId: string, config: CreatePlugin): Promise<any>;
    removeRoutePlugin(instanceName: string, routeIdOrName: string, pluginId: string): Promise<any>
}

export type JsonObject = {
    [key in string]?: JsonValue;
};
