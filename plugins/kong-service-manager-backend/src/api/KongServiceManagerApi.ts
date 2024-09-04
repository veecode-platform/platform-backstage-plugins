import { Config } from "@backstage/config";
import { KongServiceManagerApi } from "./types";
import { KongServiceManagerOptions } from "../utils/types";
import { 
    AssociatedPluginsResponse, 
    CreatePlugin, 
    CreateRoute, 
    PluginFieldsResponse, 
    PluginPerCategory, 
    RouteResponse, 
    RoutesResponse, 
    SchemaFields, 
    ServiceInfoResponse 
} from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { getPluginFieldType } from "../utils/helpers/getPluginFieldType";
import { KongConfig } from "../lib";
import { PluginsInfoData } from "../data/data";
import { IKongConfigOptions } from "../lib/types";


class Client implements KongServiceManagerApi {
    private readonly config: Config;
    private readonly instanceConfig : KongConfig;

    constructor(opts: KongServiceManagerOptions) {
        this.config = opts.config;
        this.instanceConfig = new KongConfig(this.config);
    }

    public async fetch <T = any>(input: string, host: string, token:string, init?: RequestInit): Promise<T> {

        const defaultHeaders: RequestInit = {
            headers: {
                Authorization: `Basic ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            ...init
        };

        const resp = await fetch(`${host}${input}`, defaultHeaders);

        if (!resp.ok) {
            throw new Error(`[${resp.type}] Request for [${host}${input}] failed with ${resp.status} - ${resp.statusText}`);
        }

        return await resp.json();
    }

    private getKongConfig(instanceName:string):IKongConfigOptions{
        return this.instanceConfig.getInstance(instanceName)
    }

    async getEnabledPlugins(instanceName:string,serviceIdOrName: string, searchFilter?:string): Promise<PluginPerCategory[]> {
   
        const {host, token} = this.getKongConfig(instanceName);
        const response = await this.fetch("/",host,token);     
        const availablePluginsResponse = Object.keys(response.plugins.available_on_server);
        let availablePluginsList = availablePluginsResponse;

        if (searchFilter !== "" && searchFilter) {
            availablePluginsList = availablePluginsResponse.filter(plugin =>
              plugin.toLowerCase().includes(searchFilter.toLowerCase())
            );
          }
          
        const associatedPluginsList = await this.getServiceAssociatedPlugins(instanceName,serviceIdOrName)

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

    async getPluginSchema(host:string,workspace:string,token:string,pluginName: string): Promise<any> {

        const response = await this.fetch(`/${workspace}/schemas/plugins/${pluginName}`, host,token)
        const fieldsMap: Map<string, SchemaFields> = response.fields.reduce((map: { set: (arg0: string, arg1: any) => void; }, fieldObj: { [x: string]: any; }) => {
            const fieldName = Object.keys(fieldObj)[0];
            const fieldDetails = fieldObj[fieldName];
            map.set(fieldName, fieldDetails);
            return map;
        }, new Map<string, SchemaFields>());

        return fieldsMap.get("config")
    }

    async getPluginFields(instanceName:string,pluginName: string): Promise<PluginFieldsResponse[]> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
        const config = await this.getPluginSchema(host,workspace,token,pluginName)
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

    async getServiceAssociatedPlugins(instanceName:string,serviceIdOrName: string): Promise<AssociatedPluginsResponse[]> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins`, host,token)
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

    async createServicePlugin(instanceName:string,serviceIdOrName: string, config: CreatePlugin): Promise<any> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
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
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins`, host,token, headers)
        return response
    }

    async editServicePlugin(instanceName:string,serviceIdOrName: string, pluginId: string, config: CreatePlugin): Promise<any> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
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
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins/${pluginId}`, host, token, headers)
        return response

    }

    async removeServicePlugin(instanceName:string,serviceIdOrName: string, pluginId: string): Promise<any> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins/${pluginId}`, host, token, headers)
        return response.message
    }

    async getRoutesFromService(instanceName:string, serviceIdOrName: string): Promise<RoutesResponse[]> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes`, host,token)
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

    async getRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string): Promise<RouteResponse> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, host, token);
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

    async createRouteFromService(instanceName:string, serviceIdOrName: string, config: CreateRoute): Promise<any> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
        const body = { ...config }
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes`, host, token, headers)
        return response
    }

    async editRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute): Promise<any> {

        const { workspace, host, token } = this.getKongConfig(instanceName);
        const body = { ...config }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, host, token, headers)
        return response
    }

    async removeRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string): Promise<any> {
        
        const { workspace, host, token } = this.getKongConfig(instanceName);
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, host, token, headers)
        return response.message
    }

    async getServiceInfo(instanceName:string,serviceIdOrName: string): Promise<ServiceInfoResponse> {
        const { workspace, host, token } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}`, host, token)
        return response
    }

}

export class KongServiceManagerApiClient implements KongServiceManagerApi {

    private readonly client: Client;

    constructor(opts: KongServiceManagerOptions) {
        this.client = new Client(opts);
    }

    async getEnabledPlugins(instanceName: string,serviceIdOrName: string,searchFilter: string = ''): Promise<PluginPerCategory[]> {
        return this.client.getEnabledPlugins(instanceName,serviceIdOrName, searchFilter)
    }

    async getPluginFields(instanceName:string, pluginName: string): Promise<PluginFieldsResponse[]> {
        return this.client.getPluginFields(instanceName,pluginName)
    }

    async getServiceAssociatedPlugins(instanceName:string,serviceIdOrName: string): Promise<AssociatedPluginsResponse[]> {
        return this.client.getServiceAssociatedPlugins(instanceName,serviceIdOrName)
    }

    async createServicePlugin(instanceName:string,serviceIdOrName: string, config: CreatePlugin): Promise<any> {
        return this.client.createServicePlugin(instanceName,serviceIdOrName, config)
    }

    async editServicePlugin(instanceName:string, serviceIdOrName: string, pluginId: string, config: CreatePlugin): Promise<any> {
        return this.client.editServicePlugin( instanceName,serviceIdOrName, pluginId, config)
    }

    async removeServicePlugin(instanceName:string,serviceIdOrName: string, pluginId: string): Promise<any> {
        return this.client.removeServicePlugin(instanceName,serviceIdOrName, pluginId)
    }

    async getRoutesFromService(instanceName:string, serviceIdOrName: string): Promise<RoutesResponse[]> {
        return this.client.getRoutesFromService(instanceName,serviceIdOrName)
    }

    async getRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string): Promise<any> {
        return this.client.getRouteFromService(instanceName, serviceIdOrName, routeIdOrName)
    }

    async createRouteFromService(instanceName:string, serviceIdOrName: string, config: CreateRoute): Promise<any> {
        return this.client.createRouteFromService(instanceName, serviceIdOrName, config)
    }

    async editRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute): Promise<any> {
        return this.client.editRouteFromService(instanceName, serviceIdOrName, routeIdOrName, config)
    }

    async removeRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string): Promise<any> {
        return this.client.removeRouteFromService(instanceName, serviceIdOrName, routeIdOrName)
    }

    async getServiceInfo(instanceName:string,serviceIdOrName: string): Promise<ServiceInfoResponse> {
        return this.client.getServiceInfo(instanceName,serviceIdOrName)
    }
}