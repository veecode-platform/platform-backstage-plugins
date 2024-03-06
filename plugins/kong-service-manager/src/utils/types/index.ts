export interface SchemaFields {
    [key: string]: any;
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
    name: string,
    slug: string,
    associated?: boolean,
    image: string,
    tags: string[],
    description: string,
  }
  
  export interface PluginsPerCategoryType  {
    ai: { 
      plugins: PluginCard[] | [] 
    };
    auth: { 
      plugins: PluginCard[] | [] 
    };
    security: { 
      plugins: PluginCard[] | [] 
    };
    trafficControl: { 
      plugins: PluginCard[] | [] 
    };
    serverless: { 
      plugins: PluginCard[] | [] 
    };
    analitics: {
      plugins: PluginCard[] | [];
    };
    transformations: {
      plugins: PluginCard[] | [];
    };
    logging: {
      plugins: PluginCard[] | [];
    };
  };
  