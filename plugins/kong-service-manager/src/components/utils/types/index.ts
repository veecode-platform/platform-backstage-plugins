export interface SchemaFields {
    [key: string]: any;
}

export interface PluginFieldsResponse {
    name: string,
    type: string
    required: boolean,
    defaultValue: string | number | boolean ,
    selectOptions: any
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
    tags: string[],
    name: string, 
    protocols: string[],
    enabled: boolean
}