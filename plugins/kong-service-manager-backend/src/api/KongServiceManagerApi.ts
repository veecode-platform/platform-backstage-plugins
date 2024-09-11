import { Config } from "@backstage/config";
import { LoggerService } from "@backstage/backend-plugin-api";
import { CatalogResponse, KongServiceManagerApi } from "./types";
import { KongServiceManagerOptions } from "../utils/types";
import { 
    AssociatedPluginsResponse, 
    CreatePlugin, 
    CreateRoute, 
    IRelation, 
    ISpec, 
    PluginFieldsResponse, 
    RouteResponse, 
    SchemaFields, 
    ServiceInfoResponse 
} from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { getPluginFieldType } from "../utils/helpers/getPluginFieldType";
import { KongConfig } from "../lib";
import { IKongAuth, IKongConfigOptions } from "../lib/types";
import { Entity } from "@backstage/catalog-model"

abstract class Client {
    protected config: Config;
    protected logger: LoggerService
    protected instanceConfig : KongConfig;

    constructor(opts: KongServiceManagerOptions) {
        this.config = opts.config;
        this.logger = opts.logger;
        this.instanceConfig = new KongConfig(this.config, this.logger);
    }

    protected async fetch <T = any>(input: string,instanceName:string, init?: RequestInit): Promise<T> {

        const { apiBaseUrl, auth } = this.getKongConfig(instanceName);
        const { kongAdmin, custom } = auth as IKongAuth;
        const credentials = kongAdmin ? {'Kong-Admin-Token' : kongAdmin} : {[`${custom!.header}`] : custom!.value};

        const defaultHeaders = {
            headers: {
                ...credentials,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            ...init
        } as RequestInit;


        const resp = await fetch(`${apiBaseUrl}${input}`, defaultHeaders);

        if (!resp.ok) {
            throw new Error(`[${resp.type}] Request for [${apiBaseUrl}${input}] failed with ${resp.status} - ${resp.statusText}`);
        }
        if (resp.status === 204) return { message: "deleted" } as any
        return await resp.json();
    }

    protected getKongConfig(instanceName:string):IKongConfigOptions{
        return this.instanceConfig.getInstance(instanceName)
    }

    protected async getEntity(kind:string, entityName: string): Promise<Entity>{
      const { backendBaseUrl } = this.instanceConfig.getConfig();
      const response = await fetch(`${backendBaseUrl}/api/catalog/entities/by-query?filter=kind=${kind},metadata.name=${entityName}`);

      if(!response.ok) throw new Error (`Failed to fetch entity: ${response.statusText}`);

      const {items : entities } : CatalogResponse<Entity> = await response.json();

      return entities[0] as Entity
    }

    protected async getSpec (specName:string): Promise<ISpec>{
      const { backendBaseUrl } = this.instanceConfig.getConfig();
      const response = await fetch(`${backendBaseUrl}/api/catalog/entities/by-query?filter=kind=api,metadata.name=${specName}`);
    
      if(!response.ok) throw new Error (`Failed to fetch spec: ${response.statusText}`);

      const {items : specs } : CatalogResponse<ISpec> = await response.json();

      return specs[0] as ISpec
    }

    protected async getSpecs(specs:string[]) : Promise<ISpec[]> {
        
      const specsResponse: ISpec[] = await Promise.all(
          specs.map(async (spec) => { 
            const specData = await this.getSpec(spec);
            return specData as ISpec; 
          })
        );
      
        return specsResponse;
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
        const availablePluginsResponse = Object.keys(response.plugins.available_on_server);
        return availablePluginsResponse;
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
            ...config
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

    async getRoutesFromService(instanceName:string, serviceIdOrName: string): Promise<RouteResponse[]> {

        const { workspace } = this.getKongConfig(instanceName);
        const response = await this.fetch(`/${workspace}/services/${serviceIdOrName}/routes`, instanceName)
        // const mapedRoutesResponse: RoutesResponse[] = response.data.map((route:RouteResponse) => {
        //     return {
        //         name: route.name,
        //         protocols: route.protocols,
        //         methods: route.methods,
        //         tags: route.tags,
        //         hosts: route.hosts,
        //         paths: route.paths
        //     }
        // })

        return response.data;
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
        const body = { 
            ...config 
        }
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

    async getSpecsByEntity(kind: string, entityName: string): Promise<ISpec[]> {
      const entity = await this.getEntity(kind,entityName);

       try{

          if (entity && entity.relations) {
           const relations = entity.relations as IRelation[];
   
           const specs: string[] = [];
   
           relations.forEach(r => {
             if (r.type === "providesApi") {
               specs.push(r.targetRef.split("/")[1]);
             }
           });
   
           if (specs.length > 0) {
             const specsResponse = await this.getSpecs(specs);
             return specsResponse as ISpec[];
           }
          }
         return [];

        }catch(err:any){
            throw new Error(`There was an error when trying to fetch the specs with the requested values. [${err}]`)
        }
    }
}
