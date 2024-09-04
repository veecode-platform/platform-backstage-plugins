import { AuthService, DiscoveryService, HttpAuthService, LoggerService } from "@backstage/backend-plugin-api";
import { Config } from "@backstage/config";
import {PermissionEvaluator} from '@backstage/plugin-permission-common';

/**
 *  @public
**/

export interface KongServiceManagerOptions {
  logger: LoggerService;
  permissions?:  PermissionEvaluator;
  discovery: DiscoveryService,
  config: Config;
  auth?: AuthService;
  httpAuth?: HttpAuthService;
}