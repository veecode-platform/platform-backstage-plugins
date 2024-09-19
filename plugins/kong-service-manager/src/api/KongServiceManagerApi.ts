import { ConfigApi, createApiRef, FetchApi } from "@backstage/core-plugin-api";
import { ScmAuthApi, ScmIntegrationsApi } from "@backstage/integration-react";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, IKongPluginSpec, ISpec, PluginFieldsResponse, PluginPerCategory, RouteResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { PullRequestResponse } from "../utils/types";

export type Options = {
    config: ConfigApi;
    fetchApi: FetchApi,
    scmAuthApi: ScmAuthApi,
    scmIntegrationsApi: ScmIntegrationsApi
};

export const kongServiceManagerApiRef = createApiRef<KongServiceManagerApi>({
    id: 'plugin.kongservicemanager',
});

export interface KongServiceManagerApi {
    getServiceInfo(serviceName:string, instanceName:string): Promise<ServiceInfoResponse>;
    getEnabledPlugins(serviceName:string, instanceName:string, searchFilter?: string): Promise<PluginPerCategory[]>;
    getPluginFields(instanceName:string,pluginName:string): Promise<PluginFieldsResponse[]>;
    getServiceAssociatedPlugins(serviceName:string, instanceName:string): Promise<AssociatedPluginsResponse[]>;
    createServicePlugin(serviceName: string, instanceName:string, config: CreatePlugin): Promise<any>;
    editServicePlugin(serviceName:string, instanceName:string, pluginId: string, config: CreatePlugin): Promise<any>;
    removeServicePlugin(serviceName:string, instanceName:string, pluginId: string): Promise<any>;
    getRoutesFromService(serviceName:string, instanceName:string): Promise<RouteResponse[]>;
    getRouteFromService(serviceName:string, instanceName:string, routeNameOrId: string): Promise<RouteResponse>;
    createRouteFromService(serviceName:string, instanceName:string, config: CreateRoute): Promise<any>;
    editRouteFromService(serviceName:string, instanceName:string, routeIdOrName: string, config: CreateRoute): Promise<any>;
    removeRouteFromService(serviceName:string, instanceName:string, routeIdOrName: string): Promise<any>;
    getSpecs(kind: string, entityName: string): Promise<ISpec[]>;
    getPluginsFromSpec(entityName: string): Promise<IKongPluginSpec[]>;
    applyPluginsToSpec(specName: string, title: string, message: string, location: string, plugins: IKongPluginSpec[]): Promise<PullRequestResponse>
}
