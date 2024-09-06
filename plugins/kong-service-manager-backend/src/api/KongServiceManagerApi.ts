import { Config } from "@backstage/config";
import { KongServiceManagerApi } from "./types";
import { KongServiceManagerOptions } from "../utils/types";
import { 
    AssociatedPluginsResponse, 
    CreatePlugin, 
    CreateRoute, 
    PluginFieldsResponse, 
    RouteResponse, 
    RoutesResponse, 
    SchemaFields, 
    ServiceInfoResponse 
} from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { getPluginFieldType } from "../utils/helpers/getPluginFieldType";
import { KongConfig } from "../lib";
import { IKongConfigOptions } from "../lib/types";

abstract class Client {
    protected config: Config;
    protected instanceConfig : KongConfig;

    constructor(opts: KongServiceManagerOptions) {
        this.config = opts.config;
        this.instanceConfig = new KongConfig(this.config);
    }

    protected async fetch <T = any>(input: string,instanceName:string, init?: RequestInit): Promise<T> {

        const {host, token} = this.getKongConfig(instanceName);
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
        if (resp.status === 204) return { message: "deleted" } as any
        return await resp.json();
    }

    protected getKongConfig(instanceName:string):IKongConfigOptions{
        return this.instanceConfig.getInstance(instanceName)
    }
}

export class KongServiceManagerApiClient extends Client implements KongServiceManagerApi {
  
    async getServiceInfo(instanceName:string,serviceIdOrName: string): Promise<ServiceInfoResponse> {
        const { workspace } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}`, instanceName)
        return response
    }

    async getEnabledPlugins(instanceName:string): Promise<string[]> {
        const response = await this.fetch("/",instanceName);    
        // const availablePluginsResponse = Object.keys(response.plugins.available_on_server);
        return Object.keys(response.plugins.available_on_server);
    }

    async getPluginSchema(instanceName:string,workspace:string,pluginName: string): Promise<any> {

        const response = await this.fetch(`/${workspace}/schemas/plugins/${pluginName}`, instanceName)
        const fieldsMap: Map<string, SchemaFields> = response.fields.reduce((map: { set: (arg0: string, arg1: any) => void; }, fieldObj: { [x: string]: any; }) => {
            const fieldName = Object.keys(fieldObj)[0];
            const fieldDetails = fieldObj[fieldName];
            map.set(fieldName, fieldDetails);
            return map;
        }, new Map<string, SchemaFields>());

        return fieldsMap.get("config")
    }

    async getPluginFields(instanceName:string,pluginName: string): Promise<PluginFieldsResponse[]> {

        const { workspace } = this.getKongConfig(instanceName);
        const config = await this.getPluginSchema(instanceName,workspace,pluginName)
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

        const { workspace } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins`, instanceName)
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

        const { workspace } = this.getKongConfig(instanceName);
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
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins`, instanceName, headers)
        return response
    }

    async editServicePlugin(instanceName:string,serviceIdOrName: string, pluginId: string, config: CreatePlugin): Promise<any> {

        const { workspace } = this.getKongConfig(instanceName);
        const body = {
            config,
            tags: ["devportal", "plugin-kong-service-manager"],
            protocols: ["https", "http"],
            enabled: true
        }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins/${pluginId}`, instanceName, headers)
        return response

    }

    async removeServicePlugin(instanceName:string,serviceIdOrName: string, pluginId: string): Promise<any> {

        const { workspace } = this.getKongConfig(instanceName);
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/plugins/${pluginId}`, instanceName, headers)
        return response.message;
    }

    async getRoutesFromService(instanceName:string, serviceIdOrName: string): Promise<RoutesResponse[]> {

        const { workspace } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes`, instanceName)
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

        const { workspace } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, instanceName);
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

        const { workspace } = this.getKongConfig(instanceName);
        const body = { 
            ...config 
        };
        const headers: RequestInit = {
            method: "POST",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes`, instanceName, headers)
        return response
    }

    async editRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute): Promise<any> {

        const { workspace } = this.getKongConfig(instanceName);
        const body = { ...config }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body)
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, instanceName, headers)
        return response
    }

    async removeRouteFromService(instanceName:string, serviceIdOrName: string, routeIdOrName: string): Promise<any> {
        
        const { workspace } = this.getKongConfig(instanceName);
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes/${routeIdOrName}`, instanceName, headers)
        return response.message
    }
}
