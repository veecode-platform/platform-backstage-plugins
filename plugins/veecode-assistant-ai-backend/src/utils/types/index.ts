import type { AuthService, DiscoveryService, HttpAuthService, HttpRouterService, LoggerService, PermissionsService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";

export interface OpenAIProviderConfig {
    apiBaseUrl: string;
    apiKey: string;
    model: string;
    timeout?: string;
    dataset?: IDataset
}

export interface IDataset {
  model: string;
  references: IDataSetReference[]
}

export interface IDataSetReference {
  id: string;
  source: string
}

export interface AssistantAIOptions {
    logger: LoggerService;
    auth: AuthService;
    httpAuth: HttpAuthService;
    httpRouter: HttpRouterService;
    permissions: PermissionsService,
    discovery: DiscoveryService,
    config: Config;
  }
 
