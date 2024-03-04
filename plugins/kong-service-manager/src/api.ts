import { createApiRef, DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api';
import { AssociatedPluginsResponse, CreatePlugin, PluginFieldsResponse, RoutesResponse, SchemaFields, ServiceInfoResponse } from './utils/types';

export const kongServiceManagerApiRef = createApiRef<KongServiceManagerApi>({
    id: 'plugin.kongservicemanager',
});

const KONG_SERVICE_MANAGER_DEFAULT_PROXY_URL = "/kong-manager/api";

function getPluginFieldType(type:string){
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

export interface KongServiceManagerApi {

    getEnabledPlugins(proxyPath?: string): Promise<string[]>;

    getPluginFields(pluginName: string, proxyPath?: string): Promise<PluginFieldsResponse[]>;

    getServiceAssociatedPlugins(serviceIdOrName:string, proxyPath?: string): Promise<AssociatedPluginsResponse[]>;

    createServicePlugin(serviceIdOrName:string, config: CreatePlugin, proxyPath?: string): Promise<any>;

    editServicePlugin(serviceIdOrName:string, config:CreatePlugin, proxyPath?: string): Promise<any>;

    removeServicePlugin(serviceIdOrName:string, pluginId: string, proxyPath?: string): Promise<any>;

    getRoutesFromService(serviceIdOrName:string, proxyPath?: string): Promise<RoutesResponse[]>;

    getServiceInfo(serviceIdOrName:string, proxyPath?: string): Promise<ServiceInfoResponse>;


}

export type Options = {
    discoveryApi: DiscoveryApi;
    identityAPi: IdentityApi;
    /**
    * Path to use for requests via the proxy, defaults to /kong-manager/api
    */
    proxyPath?: string;
};

class Client {
    private readonly discoveryApi: DiscoveryApi;
    private readonly proxyPath: string;
    private readonly identityApi: IdentityApi;

    constructor(opts: Options) {
        this.discoveryApi = opts.discoveryApi;
        this.identityApi = opts.identityAPi;
        this.proxyPath = opts.proxyPath || KONG_SERVICE_MANAGER_DEFAULT_PROXY_URL;
    }

    public async fetch<T = any>(input: string, proxyPath?: string, init?: RequestInit): Promise<T> {

        const apiUrl = await this.apiUrl(proxyPath);
        const identityToken = await this.identityApi.getCredentials()

        const resp = await fetch(`${apiUrl}${input}`, {
            ...init,
            headers: {
                "X-authorization-identity": `${identityToken.token}`              
            }
        });

        if (!resp.ok) {
            throw new Error(`Request failed with ${resp.status} - ${resp.statusText}`);
        }

        if(resp.status === 204) return {message: "deleted"} as any
        return await resp.json();
    }

    async apiUrl(proxyPath?: string) {
        const baseUrl = await this.discoveryApi.getBaseUrl("proxy")
        return `${baseUrl}${proxyPath || this.proxyPath}`
    }

    async getEnabledPlugins(proxyPath?: string): Promise<string[]>{
        const response = await this.fetch("/plugins/enabled", proxyPath)
        return response.enabled_plugins
    }

    async getPluginSchema(pluginName: string, proxyPath?: string): Promise<any>{
        
        const response = await this.fetch(`/schemas/plugins/${pluginName}`, proxyPath)

        const fieldsMap: Map<string, SchemaFields> = response.fields.reduce((map: { set: (arg0: string, arg1: any) => void; }, fieldObj: { [x: string]: any; }) => {
            const fieldName = Object.keys(fieldObj)[0];
            const fieldDetails = fieldObj[fieldName];
            map.set(fieldName, fieldDetails);
            return map;
        }, new Map<string, SchemaFields>());

        return fieldsMap.get("config")
    }

    async getPluginFields(pluginName: string, proxyPath?: string):Promise<PluginFieldsResponse[]>{
        const config = await this.getPluginSchema(pluginName, proxyPath)
        if(!config) throw new Error("Impossible to find plugin config")

        const mapedFields:PluginFieldsResponse[] = config.fields.map((field:any) => {
            const pluginFieldName = Object.keys(field)[0]
            return {
                name: pluginFieldName,
                type: getPluginFieldType(field[pluginFieldName].type),
                required: field[pluginFieldName].required || false,
                defaultValue: field[pluginFieldName].default,
                arrayType: field[pluginFieldName].elements?.type,
                isMultipleArray: field[pluginFieldName].elements?.one_of ? true : false,
                arrayOptions: field[pluginFieldName].elements?.one_of,
            }
        } )

        return mapedFields
    }

    async getServiceAssociatedPlugins(serviceIdOrName: string, proxyPath?: string): Promise<AssociatedPluginsResponse[]>{
        const response = await this.fetch(`/services/${serviceIdOrName}/plugins`, proxyPath)
        const mapedPluginsData:AssociatedPluginsResponse[] = response.data.map((data: { name: any; id: any; tags: any; enabled: any; created_at: any; config: any; }) => {
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

    async createServicePlugin(serviceIdOrName: string, config: CreatePlugin, proxyPath?: string): Promise<any>{
        const body = {
            ...config,
            service: null,
            consumer: null
        }
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/services/${serviceIdOrName}/plugins`, proxyPath, headers)
        return response
    }

    async editServicePlugin(serviceIdOrName: string, config: CreatePlugin, proxyPath?: string): Promise<any>{
        const body = {
            ...config,
            service: null,
            consumer: null
        }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/services/${serviceIdOrName}/plugins`, proxyPath, headers)
        return response

    }

    async removeServicePlugin(serviceIdOrName: string, pluginId: string, proxyPath?: string): Promise<any>{
        const response = await this.fetch(`/services/${serviceIdOrName}/plugins/${pluginId}`, proxyPath)
        return response.message
    }

    async getRoutesFromService(serviceIdOrName: string, proxyPath?: string): Promise<RoutesResponse[]>{
        const response = await this.fetch(`/services/${serviceIdOrName}/routes`, proxyPath)

        const mapedRoutesResponse:RoutesResponse[] = response.data.map((route: { name: any; protocols: any; methods: any; tags: any; hosts: any; paths: any; }) => {
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

    async getServiceInfo(serviceIdOrName: string, proxyPath?: string): Promise<ServiceInfoResponse>{
        const response = await this.fetch(`/services/${serviceIdOrName}`, proxyPath)
        return response
    }

}

export class KongServiceManagerApiClient implements KongServiceManagerApi {

    private readonly client: Client;

    constructor(opts: Options) {
        this.client = new Client(opts);
    }

    async getEnabledPlugins(proxyPath?: string | undefined): Promise<string[]> {
        return this.client.getEnabledPlugins(proxyPath)
    }

    async getPluginFields(pluginName: string, proxyPath?: string | undefined): Promise<PluginFieldsResponse[]> {
        return this.client.getPluginFields(pluginName, proxyPath)
    }

    async getServiceAssociatedPlugins(serviceIdOrName: string, proxyPath?: string | undefined): Promise<AssociatedPluginsResponse[]> {
        return this.client.getServiceAssociatedPlugins(serviceIdOrName, proxyPath)
    }

    async createServicePlugin(serviceIdOrName: string, config: CreatePlugin, proxyPath?: string | undefined): Promise<any> {
        return this.client.createServicePlugin(serviceIdOrName, config, proxyPath)
    }

    async editServicePlugin(serviceIdOrName: string, config: CreatePlugin, proxyPath?: string | undefined): Promise<any> {
       return this.client.editServicePlugin(serviceIdOrName, config, proxyPath) 
    }

    async removeServicePlugin(serviceIdOrName: string, pluginId: string, proxyPath?: string | undefined): Promise<any> {
        return this.client.removeServicePlugin(serviceIdOrName, pluginId, proxyPath)
    }
    
    async getRoutesFromService(serviceIdOrName: string, proxyPath?: string | undefined): Promise<RoutesResponse[]> {
        return this.client.getRoutesFromService(serviceIdOrName, proxyPath)
    }
    
    async getServiceInfo(serviceIdOrName: string, proxyPath?: string | undefined): Promise<ServiceInfoResponse> {
        return this.client.getServiceInfo(serviceIdOrName, proxyPath)
    }
}