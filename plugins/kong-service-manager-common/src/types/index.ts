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
    defaultValue: string | number | boolean | any ,
    defaultValues?: string | string[] | number | boolean | any ,
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
    protocols?: string[];
    methods?: string[];
    hosts?: string[];
    paths?: string[];
    snis?: string[];
    headers?: {[key: string]: string[]};
    sources?: {[key: string]: string[]};
    destinations?: {[key: string]: string[]};
    https_redirect_status_code?: number;
    regex_priority?: number;
    strip_path?: boolean;
    path_handling?: "v0" | "v1";
    preserve_host?: boolean;
    request_buffering?: boolean;
    response_buffering?: boolean;
    tags?: string[];
  }

  export interface RouteResponse{
    name: string,
    protocols: string[],
    methods: string[],
    tags: string[],
    hosts: string[],
    paths: string[] 
    snis: string[],
    headers: {[key: string]: string[]},
    sources: {[key: string]: string[]},
    destinations: {[key: string]: string[]},
    https_redirect_status_code: number,
    regex_priority: number,
    strip_path: boolean,
    preserve_host: boolean,
    request_buffering: boolean,
    response_buffering: boolean,
  }

  export interface HeaderObj {
    id: string;
    value: string;
  }

  export interface Headers {
    headers: {
        [key: string]: string[];
    };
  }

  export interface Destination {
    ip: string;
    port: number;
  }

  export interface Sources {
    ip: string;
    port: number;
  }
  
  export interface ISpec {
    metadata: IMetadata,
    apiVersion: string,
    kind: string,
    spec: ISpecType,
    relations: IRelation[]
  }

  export interface IMetadata {
  namespace: string,
  annotations: { [key:string]: string },
  name: string,
  title: string,
  publishedAt: Date,
  description: string,
  tags: string[],
  uid: string,
  etag: string
}

export interface ISpecType {
  type: string,
  lifecycle: string,
  owner: string,
  definition: string
}

export interface IRelation {
  type: string,
  targetRef: string
}

export interface IKongPluginSpec {
  name: string,
  enable: boolean,
  config: object
}
export interface IPluginSpec {
  name: string,
  description:string,
  owner: string,
  tags: string[],
  plugins: IKongPluginSpec[]
}