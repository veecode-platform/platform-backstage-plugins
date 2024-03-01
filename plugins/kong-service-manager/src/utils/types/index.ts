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
    name: string,
    slug: string,
    associated?: boolean,
    image: string,
    tags: string[],
    description: string,
  }
  
  