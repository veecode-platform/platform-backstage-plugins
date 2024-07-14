import { DiscoveryApi } from "@backstage/core-plugin-api";

export interface KongServiceManagerApi {

    getEnabledPlugins(proxyPath: string): Promise<string[]>;

    getPluginFields(workspace:string,pluginName: string, proxyPath: string): Promise<PluginFieldsResponse[]>;

    getServiceAssociatedPlugins(workspace:string,serviceIdOrName: string, proxyPath: string): Promise<AssociatedPluginsResponse[]>;

    createServicePlugin(workspace:string, serviceIdOrName: string, config: CreatePlugin, proxyPath: string): Promise<any>;

    editServicePlugin(workspace:string,serviceIdOrName: string, pluginId: string, config: CreatePlugin, proxyPath: string): Promise<any>;

    removeServicePlugin(workspace:string,serviceIdOrName: string, pluginId: string, proxyPath: string): Promise<any>;

    getRoutesFromService(workspace:string,serviceIdOrName: string, proxyPath: string): Promise<RoutesResponse[]>;

    createRouteFromService(workspace:string, serviceIdOrName: string, config: CreateRoute, proxyPath?: string | undefined ): Promise<any>;

    editRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, config: CreateRoute, proxyPath?: string | undefined ): Promise<any>;

    removeRouteFromService(workspace:string, serviceIdOrName: string, routeIdOrName: string, proxyPath?: string | undefined ): Promise<any>;

    getServiceInfo(workspace:string,serviceIdOrName: string, proxyPath: string): Promise<ServiceInfoResponse>;

    getAllEnabledPlugins(workspace:string,serviceIdOrName: string, proxyPath: string, searchFilter?: string): Promise<PluginPerCategory[]>;


}

export type Options = {
    discoveryApi: DiscoveryApi;
    proxyPath?: string;
};
export interface SchemaFields {
    [key: string]: any;
}

export interface PluginPerCategory {
  category: string,
  plugins: PluginCard[] | []
}

export interface PluginFieldsResponse {
    name: string,
    type: string
    required: boolean,
    defaultValue: string | number | boolean ,
    arrayType: string | number | boolean | any | undefined,
    arrayOptions: string[] | number[] | boolean[] | any[] | undefined,
    isMultipleArray: boolean,
    recordFields?: any
}

export interface AssociatedPluginsResponse {
    name: string,
    id: string,
    tags: string[],
    enabled: boolean,
    createdAt: number,
    config: any
}

export interface RoutesResponse{
    name: string, 
    protocols: string[],
    methods: string[],
    tags: string[],
    hosts: string[],
    paths: string[] 
}

export interface CreatePlugin{
    config: any,
    name: string, 
}

export interface ServiceInfoResponse {
    tags: string[];
    ca_certificates: string[];
    updated_at: number;
    read_timeout: number;
    host: string;
    id: string;
    retries: number;
    write_timeout: number;
    connect_timeout: number;
    name: string;
    path: string;
    tls_verify: boolean;
    port: number;
    tls_verify_depth: any;
    created_at: number;
    enabled: boolean;
    client_certificate: any;
    protocol: string;
}
  
  export interface PluginCard {
    id?: string | null,
    name: string,
    slug: string,
    associated?: boolean,
    image: string,
    tags: string[],
    description: string,
  }

  export interface CreateRoute {
    name?: string;
    protocols: string[];
    methods: string[];
    hosts: Array<{ id: string; value: string }>;
    paths: Array<{ id: string; value: string }>;
    headers: Array<{ id: string; value: string }>;
    https_redirect_status_code: number;
    regex_priority: number;
    strip_path: boolean;
    path_handling: "v0" | "v1";
    preserve_host: boolean;
    request_buffering: boolean;
    response_buffering: boolean;
    tags: string[];

  }

