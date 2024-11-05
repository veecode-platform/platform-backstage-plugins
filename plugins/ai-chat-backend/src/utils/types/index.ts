import type { AuthService, DiscoveryService, HttpAuthService, LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";

export type OpenAIProviderConfig = {
    apiBaseUrl: string;
    apiKey: string;
    assistant: string;
    model: string;
    instructions: string;
}

export interface OpenAIOptions {
    logger: LoggerService;
    discovery: DiscoveryService,
    config: Config;
    auth: AuthService;
    httpAuth: HttpAuthService;
  }
 
 export interface OpenAIResponse {
    id: string;
    object: string;
    [key: string]: any;
  }
  