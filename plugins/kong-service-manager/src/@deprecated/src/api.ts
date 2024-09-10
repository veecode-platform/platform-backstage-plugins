import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';
import { AssociatedPluginsResponse, CreatePlugin, PluginFieldsResponse, RoutesResponse, SchemaFields, ServiceInfoResponse, PluginPerCategory, Options, KongServiceManagerApi, CreateRoute, RouteResponse } from './utils/types';
import { PluginsInfoData } from "../src/data/data"

export const kongServiceManagerApiDeprecatedRef = createApiRef<KongServiceManagerApi>({
    id: 'plugin.kongservicemanagerdeprecated',
});

function getPluginFieldType(type: string) {
    switch (type) {
        case "string":
            return "string"

        case "number":
        case "integer":
            return "number"

        case "boolean":
            return "boolean"

        case "array":
            return "array"

        case "record":
            return "record"
        default:
            return "string"
    }
}

class Client implements KongServiceManagerApi {
    private readonly discoveryApi: DiscoveryApi;
    private readonly proxyPath: string;
    

    constructor(opts: Options) {
        this.discoveryApi = opts.discoveryApi;
        this.proxyPath = opts.proxyPath as string;
    }

    public async fetch <T = any>(input: string, proxyPath?: string, init?: RequestInit): Promise<T> {

        const apiUrl = await this.apiUrl(proxyPath);

        const resp = await fetch(`${apiUrl}${input}`, {
            ...init
        });

        if (!resp.ok) {
            throw new Error(`[${resp.type}] Request failed with ${resp.status} - ${resp.statusText}`);
        }

        if (resp.status === 204) return { message: "deleted" } as any
        return await resp.json();
    }

    async apiUrl(proxyPath?: string):Promise<string> {
        const baseUrl = await this.discoveryApi.getBaseUrl("proxy")
        return `${baseUrl}${proxyPath || this.proxyPath}`
    }

    async getEnabledPlugins(proxyPath?: string): Promise<string[]> {
        const response = await this.fetch("/plugins/enabled", proxyPath)
        return response.enabled_plugins
    }

    async getAllEnabledPlugins(workspace:string,serviceIdOrName: string, proxyPath?: string, searchFilter?:string): Promise<PluginPerCategory[]> {
        const response = await this.fetch("/", proxyPath);     
        const availablePluginsResponse = Object.keys(response.plugins.available_on_server);
        let availablePluginsList = availablePluginsResponse;

        if (searchFilter !== "" && searchFilter) {
            availablePluginsList = availablePluginsResponse.filter(plugin =>
              plugin.toLowerCase().includes(searchFilter.toLowerCase())
            );
          }
          
        const associatedPluginsList = await this.getServiceAssociatedPlugins(workspace,serviceIdOrName, proxyPath)

        const mapedEnabledPluginsList = PluginsInfoData.categories.map((category) => {

            return {
                category: category.category,
                plugins: category.plugins.flatMap((categoryPlugin) => {
                    const filteredPluginMatch = availablePluginsList.find((availablePlugin) => availablePlugin === categoryPlugin.slug)
                    if (!filteredPluginMatch) return []
    
                    const filteredAssocietedPluginMatch = associatedPluginsList.find((associatedPlugin) => associatedPlugin.name === categoryPlugin.slug)
                    return {
                        id: filteredAssocietedPluginMatch?.id ?? null,
                        name: categoryPlugin.name,
                        slug: categoryPlugin.slug,
                        associated: filteredAssocietedPluginMatch?.enabled ?? false,
                        image: categoryPlugin.image,
                        tags: categoryPlugin.tags,
                        description: categoryPlugin.description
                    }
                })
            }
        })
        return mapedEnabledPluginsList

    }

    async getPluginSchema(workspace:string,pluginName: string, proxyPath?: string): Promise<any> {
        const response = await this.fetch(`/${workspace}/schemas/plugins/${pluginName}`, proxyPath)

        const fieldsMap: Map<string, SchemaFields> = response.fields.reduce((map: { set: (arg0: string, arg1: any) => void; }, fieldObj: { [x: string]: any; }) => {
            const fieldName = Object.keys(fieldObj)[0];
            const fieldDetails = fieldObj[fieldName];
            map.set(fieldName, fieldDetails);
            return map;
        }, new Map<string, SchemaFields>());

        return fieldsMap.get("config")
    }

    async getPluginFields(workspace:string,pluginName: string, proxyPath?: string): Promise<PluginFieldsResponse[]> {
        const config = await this.getPluginSchema(workspace,pluginName, proxyPath)
        if (!config) throw new Error("Impossible to find plugin config")

        const mapedFields: PluginFieldsResponse[] = config.fields.map((field: any) => {
            const pluginFieldName = Object.keys(field)[0]
            const pluginR: PluginFieldsResponse = {
                name: pluginFieldName,
                type: getPluginFieldType(field[pluginFieldName].type),
                required: field[pluginFieldName].required || false,
                defaultValue: field[pluginFieldName].default,
                arrayType: field[pluginFieldName].elements?.type,
                isMultipleArray: field[pluginFieldName].elements?.one_of ? true : false,
                arrayOptions: field[pluginFieldName].elements?.one_of,
            }
            if (pluginR.arrayType === "record") {
                const mapedRecordFields = field[pluginFieldName].elements?.fields.map((record: any) => {
                    const recordName = Object.keys(record)[0]
                    return {
                        name: recordName,
                        type: record[recordName].type,
                        required: record[recordName].required,
                        arrayOptions: record[recordName].one_of
                    }
                })
                pluginR.recordFields = mapedRecordFields
            }
            return pluginR

        })
        return mapedFields
    }

    async getServiceAssociatedPlugins(workspace:string,serviceIdOrName: string, proxyPath?: string): Promise<AssociatedPluginsResponse[]> {
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins`, proxyPath)
        const mapedPluginsData: AssociatedPluginsResponse[] = response.data.map((data: { name: any; id: any; tags: any; enabled: any; created_at: any; config: any; }) => {
            return {
                name: data.name,
                id: data.id,
                tags: data.tags,
                enabled: data.enabled,
                createdAt: data.created_at,
                config: data.config
            }
        })
        return mapedPluginsData

    }

    async createServicePlugin(workspace:string,serviceIdOrName: string, config: CreatePlugin, proxyPath?: string): Promise<any> {
        const body = {
            ...config,
            tags: ["devportal", "plugin-kong-service-manager"],
            protocols: ["https", "http"],
            service: null,
            consumer: null,
            enabled: true
        }
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins`, proxyPath, headers)
        return response
    }

    async editServicePlugin(workspace:string,serviceIdOrName: string, pluginId: string, config: CreatePlugin, proxyPath?: string): Promise<any> {
        const body = {
            ...config,
            tags: ["devportal", "plugin-kong-service-manager"],
            protocols: ["https", "http"],
            enabled: true
        }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins/${pluginId}`, proxyPath, headers)
        return response

    }

    async removeServicePlugin(workspace:string,serviceIdOrName: string, pluginId: string, proxyPath?: string): Promise<any> {
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins/${pluginId}`, proxyPath, headers)
        return response.message
    }

    async getRoutesFromService(workspace:string, serviceIdOrName: string, proxyPath?: string): Promise<RoutesResponse[]> {
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes`, proxyPath)

        const mapedRoutesResponse: RoutesResponse[] = response.data.map((route: { name: any; protocols: any; methods: any; tags: any; hosts: any; paths: any; }) => {
            return {
                name: route.name,
                protocols: route.protocols,
                methods: route.methods,
                tags: route.tags,
                hosts: route.hosts,
                paths: route.paths
            }
        })

        return mapedRoutesResponse
    }

    async getRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, proxyPath?: string): Promise<RouteResponse> {
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, proxyPath)

        const route: RouteResponse = {
            name: response.name,
            protocols: response.protocols,
            methods: response.methods,
            tags: response.tags,
            hosts: response.hosts,
            paths: response.paths,
            snis: response.snis,
            headers: response.headers,
            sources: response.sources,
            destinations: response.destinations,
            https_redirect_status_code: response.https_redirect_status_code,
            regex_priority: response.regex_priority,
            strip_path: response.strip_path,
            preserve_host: response.preserve_host,
            request_buffering: response.request_buffering,
            response_buffering: response.response_buffering,
        }

        return route;
    }

    async createRouteFromService(workspace:string, serviceIdOrName: string, config: CreateRoute, proxyPath?: string): Promise<any> {
        const body = { ...config }
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes`, proxyPath, headers)
        return response
    }

    async editRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute, proxyPath?: string): Promise<any> {
        const body = { ...config }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, proxyPath, headers)
        return response
    }

    async removeRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, proxyPath?: string): Promise<any> {
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, proxyPath, headers)
        return response.message
    }

    async getServiceInfo(workspace:string,serviceIdOrName: string, proxyPath?: string): Promise<ServiceInfoResponse> {
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}`, proxyPath)
        return response
    }

}

export class KongServiceManagerApiClientDeprecated implements KongServiceManagerApi {

    private readonly client: Client;

    constructor(opts: Options) {
        this.client = new Client(opts);
    }

    async getEnabledPlugins(proxyPath?: string | undefined): Promise<string[]> {
        return this.client.getEnabledPlugins(proxyPath)
    }

    async getPluginFields(workspace:string, pluginName: string, proxyPath?: string | undefined ): Promise<PluginFieldsResponse[]> {
        return this.client.getPluginFields(workspace,pluginName, proxyPath)
    }

    async getServiceAssociatedPlugins(workspace:string,serviceIdOrName: string, proxyPath?: string | undefined ): Promise<AssociatedPluginsResponse[]> {
        return this.client.getServiceAssociatedPlugins(workspace,serviceIdOrName, proxyPath)
    }

    async createServicePlugin(workspace:string,serviceIdOrName: string, config: CreatePlugin, proxyPath?: string | undefined ): Promise<any> {
        return this.client.createServicePlugin(workspace,serviceIdOrName, config, proxyPath)
    }

    async editServicePlugin(workspace:string, serviceIdOrName: string, pluginId: string, config: CreatePlugin, proxyPath?: string | undefined ): Promise<any> {
        return this.client.editServicePlugin(workspace,serviceIdOrName, pluginId, config, proxyPath)
    }

    async removeServicePlugin(workspace:string,serviceIdOrName: string, pluginId: string, proxyPath?: string | undefined ): Promise<any> {
        return this.client.removeServicePlugin(workspace,serviceIdOrName, pluginId, proxyPath)
    }

    async getRoutesFromService(workspace:string, serviceIdOrName: string, proxyPath?: string | undefined ): Promise<RoutesResponse[]> {
        return this.client.getRoutesFromService(workspace,serviceIdOrName, proxyPath)
    }

    async getRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, proxyPath?: string | undefined ): Promise<any> {
        return this.client.getRouteFromService(workspace, serviceIdOrName, routeIdOrName, proxyPath)
    }

    async createRouteFromService(workspace:string, serviceIdOrName: string, config: CreateRoute, proxyPath?: string | undefined ): Promise<any> {
        return this.client.createRouteFromService(workspace, serviceIdOrName, config, proxyPath)
    }

    async editRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute, proxyPath?: string | undefined ): Promise<any> {
        return this.client.editRouteFromService(workspace, serviceIdOrName, routeIdOrName, config, proxyPath)
    }

    async removeRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, proxyPath?: string | undefined ): Promise<any> {
        return this.client.removeRouteFromService(workspace, serviceIdOrName, routeIdOrName, proxyPath)
    }

    async getServiceInfo(workspace:string,serviceIdOrName: string, proxyPath?: string | undefined ): Promise<ServiceInfoResponse> {
        return this.client.getServiceInfo(workspace,serviceIdOrName, proxyPath)
    }

    async getAllEnabledPlugins(workspace:string,serviceIdOrName: string, proxyPath?: string | undefined , searchFilter?: string): Promise<PluginPerCategory[]> {
        return this.client.getAllEnabledPlugins(workspace,serviceIdOrName, proxyPath, searchFilter)
    }
}