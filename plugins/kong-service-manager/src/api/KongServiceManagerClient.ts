import { ConfigApi, FetchApi } from "@backstage/core-plugin-api";
import { KongServiceManagerApi, Options } from "./KongServiceManagerApi";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, IKongPluginSpec, PluginCard, PluginFieldsResponse, PluginPerCategory, RouteResponse, ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { PluginsInfoData } from "../data/data";
import { GitManager } from "./GitManager";

 abstract class Client {
    protected readonly config: ConfigApi;
    private readonly fetchApi: FetchApi;
    gitManager: GitManager;
    
    constructor(opts: Options) { 
        this.config = opts.config as ConfigApi; 
        this.fetchApi = opts.fetchApi as FetchApi;
        this.gitManager = new GitManager(opts.scmAuthApi,opts.config)
    }

    protected async fetch <T = any>(input: string, init?: RequestInit): Promise<T> {

        const apiUrl = `${this.config.getString("backend.baseUrl")}/api/kong`;

        const resp = await this.fetchApi.fetch(`${apiUrl}${input}`, {
            ...init
        });

        if (!resp.ok) {
            throw new Error(`[${resp.type}] Request failed with ${resp.status} - ${resp.statusText}`);
        }
        if (resp.status === 204) return { message: "deleted" } as any

        return await resp.json();
    }
}

export class KongServiceManagerApiClient extends Client implements KongServiceManagerApi {


    async getServiceInfo(instanceName: string, serviceName:string): Promise<ServiceInfoResponse> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}`)
        return response.service
    }
    async getImagePayload (pluginName:string) {
    const response = await import(`../assets/plugins/${pluginName}`) 
    return response.default
    }

    async getEnabledPlugins(instanceName: string, serviceName: string, searchFilter?: string): Promise<PluginPerCategory[]> {
        const response = await this.fetch(`/${instanceName}/plugins`);
        const availablePluginsResponse = response.plugins as string[];
        let availablePluginsList = availablePluginsResponse;
    
        if (searchFilter !== "" && searchFilter) {
            availablePluginsList = availablePluginsResponse.filter(plugin =>
                plugin.toLowerCase().includes(searchFilter.toLowerCase())
            );
        }
    
        const associatedPluginsList = await this.getServiceAssociatedPlugins(instanceName, serviceName);
    
        const mapedEnabledPluginsList = await Promise.all(PluginsInfoData.categories.map(async (category) => {
            const plugins = await Promise.all(category.plugins.map(async (categoryPlugin) => {
                const filteredPluginMatch = availablePluginsList.find((availablePlugin) => availablePlugin === categoryPlugin.slug);
                if (!filteredPluginMatch) return null; 
    
                const filteredAssocietedPluginMatch = associatedPluginsList.find((associatedPlugin) => associatedPlugin.name === categoryPlugin.slug);
                return {
                    id: filteredAssocietedPluginMatch?.id ?? null,
                    name: categoryPlugin.name,
                    slug: categoryPlugin.slug,
                    associated: filteredAssocietedPluginMatch?.enabled ?? false,
                    image: await this.getImagePayload(categoryPlugin.image),
                    tags: categoryPlugin.tags,
                    description: categoryPlugin.description
                };
            }));
    
 
            return {
                category: category.category,
                plugins: plugins.filter((plugin) => plugin !== null) as PluginCard[], 
            };
        }));
    
        return mapedEnabledPluginsList;
    }

    async getEnabledRoutePlugins(instanceName: string, routeId: string, searchFilter?: string): Promise<PluginPerCategory[]> {
        const response = await this.fetch(`/${instanceName}/plugins`);
        const availablePluginsResponse = response.plugins as string[];
        let availablePluginsList = availablePluginsResponse;
    
        if (searchFilter !== "" && searchFilter) {
            availablePluginsList = availablePluginsResponse.filter(plugin =>
                plugin.toLowerCase().includes(searchFilter.toLowerCase())
            );
        }
    
        const associatedPluginsList = await this.getRouteAssociatedPlugins(instanceName, routeId);
    
        const mapedEnabledPluginsList = await Promise.all(PluginsInfoData.categories.map(async (category) => {
            const plugins = await Promise.all(category.plugins.map(async (categoryPlugin) => {
                const filteredPluginMatch = availablePluginsList.find((availablePlugin) => availablePlugin === categoryPlugin.slug);
                if (!filteredPluginMatch) return null; 
    
                const filteredAssocietedPluginMatch = associatedPluginsList.find((associatedPlugin) => associatedPlugin.name === categoryPlugin.slug);
                return {
                    id: filteredAssocietedPluginMatch?.id ?? null,
                    name: categoryPlugin.name,
                    slug: categoryPlugin.slug,
                    associated: filteredAssocietedPluginMatch?.enabled ?? false,
                    image: await this.getImagePayload(categoryPlugin.image),
                    tags: categoryPlugin.tags,
                    description: categoryPlugin.description
                };
            }));
    
 
            return {
                category: category.category,
                plugins: plugins.filter((plugin) => plugin !== null) as PluginCard[], 
            };
        }));
    
        return mapedEnabledPluginsList;
    }
    

    async getPluginFields(instanceName:string, pluginName:string): Promise<PluginFieldsResponse[]> {
        const response = await this.fetch(`/${instanceName}/services/plugins/${pluginName}/fields`)
        return response.fields
    }

    async getServiceAssociatedPlugins(instanceName:string,serviceName:string): Promise<AssociatedPluginsResponse[]> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/associated`)
        return response.plugins
    }

    async createServicePlugin(instanceName:string, serviceName:string, config: CreatePlugin): Promise<any> {
        const body = {
            config
        }
        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body),
         headers: {
            'Content-Type': 'application/json', 
          }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins`,headers)
        return response
    }

    async editServicePlugin(instanceName:string,serviceName: string, pluginId: string, config: CreatePlugin): Promise<any> {
        const body = {
            ...config
        }
        const headers: RequestInit = {
         method: "PATCH",
         body: JSON.stringify(body),
         headers: {
             'Content-Type': 'application/json', 
         }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/${pluginId}`, headers)
        return response

    }

    async removeServicePlugin(instanceName:string,serviceName: string, pluginId: string): Promise<any> {

        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/plugins/${pluginId}`, headers)
        return response.message
    }

    async getRoutesFromService(instanceName:string, serviceName: string): Promise<RouteResponse[]> {  
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes`)
        return response.routes
    }

    async getRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<RouteResponse> {
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`);
        return response.route;
    }

    async createRouteFromService(instanceName:string, serviceName: string, config: CreateRoute): Promise<any> {
        const body = {
            config,
         }
        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body),
         headers: {
             'Content-Type': 'application/json', 
         }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes`,headers)
        return response.route
    }

    async editRouteFromService(instanceName:string, serviceName: string, routeId: string, config: CreateRoute): Promise<any> {
        const body = { 
            config,
         }
        const headers: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json', 
            }
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`,headers)
        return response
    }

    async removeRouteFromService(instanceName:string, serviceName: string, routeId: string): Promise<any> {
        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${instanceName}/services/${serviceName}/routes/${routeId}`, headers)
        return response.message
    }

    async getRouteAssociatedPlugins(instanceName:string,routeId:string): Promise<AssociatedPluginsResponse[]> {
        const response = await this.fetch(`/${instanceName}/routes/${routeId}/plugins/associated`)
        return response.plugins
    }

    async addRoutePlugin(instanceName:string, routeId:string, config: CreatePlugin): Promise<any> {
        const body = {
            config
        }
        const headers: RequestInit = {
         method: "POST",
         body: JSON.stringify(body),
         headers: {
            'Content-Type': 'application/json', 
          }
        }
        const response = await this.fetch(`/${instanceName}/routes/${routeId}/plugins`,headers)
        return response
    }

    async editRoutePlugin(instanceName:string,routeId: string, pluginId: string, config: CreatePlugin): Promise<any> {
        const body = {
            ...config
        }
        const headers: RequestInit = {
         method: "PATCH",
         body: JSON.stringify(body),
         headers: {
             'Content-Type': 'application/json', 
         }
        }
        const response = await this.fetch(`/${instanceName}/routes/${routeId}/plugins/${pluginId}`, headers)
        return response

    }

    async removeRoutePlugin(instanceName:string,routeId: string, pluginId: string): Promise<any> {

        const headers: RequestInit = {
            method: "DELETE",
        }
        const response = await this.fetch(`/${instanceName}/routes/${routeId}/plugins/${pluginId}`, headers)
        return response.message
    }

    async getAllSpecs(location:string, filePath:string[]){
       return this.gitManager.getContentSpec(location,filePath);
    }

    async getPluginsFromSpec(entityName:string):Promise<IKongPluginSpec[]>{
        const response = await this.fetch(`/spec/${entityName}/plugins`);
        return response.plugins as IKongPluginSpec[]
    }


    async applyPluginsToSpec(specName:string,location: string, fileContent:string, title: string, message: string){

        return this.gitManager.createPullRequest(
            specName,
            location,
            fileContent,
            title,
            message
        )
    }

}