export class InfracostResponse<RESULT_TYPE> {
  results!: RESULT_TYPE[];
}

export class InfracostCatalog {
    type!: string;
    api_version!: string;
    id!: string;
    name!: string;
    title?: string;
    owner_url!: string;
    created_at!: string;
    updated_at!: string;
    org_url!: string;
    url!: string; 
}

export class InfracostFinOps {
    apiVersion?: string;
    kind?: string;
    metadata?: string;
    version?: string;
    title?: string;
    state?: string;
    scope?: string;
    gateway_type?: string;
    oai_version?: string;
    document_specification?: string;
    base_paths?: string[];
    enforced?: boolean;
    gateway_service_urls?: string[];
    user_registry_urls?: string[];
    oauth_provider_urls?: string[];
    tls_client_profile_urls?: string[];
    extension_urls?: string[];
    policy_urls?: string[];
    created_at?: string;
    updated_at?: string;
    org_url!: string;
    catalog_url!: string;
    url!: string;
  }