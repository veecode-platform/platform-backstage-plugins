import type { AuthService, DiscoveryService, HttpAuthService, HttpRouterService, LoggerService, PermissionsService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { DatabaseVeeStore } from "../../database";

export interface OpenAIProviderConfig {
    apiBaseUrl: string;
    apiKey: string;
    model: string;
    timeout?: string;
    templateGenerationModel?: ICustomModel
}

export interface ICustomModel {
  model: string;
}

export interface AssistantAIOptions {
    logger: LoggerService;
    database: DatabaseVeeStore,
    auth: AuthService;
    httpAuth: HttpAuthService;
    httpRouter: HttpRouterService;
    permissions: PermissionsService,
    discovery: DiscoveryService,
    config: Config;
  }
 
