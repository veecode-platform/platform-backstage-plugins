import { AuthService, DiscoveryService, HttpAuthService, LoggerService, PermissionsService } from "@backstage/backend-plugin-api";
import { Config } from "@backstage/config";

/**
 *  @public
**/

export interface KongServiceManagerOptions {
  logger: LoggerService;
  permissions:  PermissionsService;
  discovery: DiscoveryService,
  config: Config;
  auth: AuthService;
  httpAuth: HttpAuthService;
}