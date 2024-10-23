import { createBackendModule } from "@backstage/backend-plugin-api";
// biome-ignore lint/style/useImportType: <explanation>
import { AuthorizeResult, isPermission, PolicyDecision } from "@backstage/plugin-permission-common";
import type { PermissionPolicy, PolicyQuery, PolicyQueryUser } from "@backstage/plugin-permission-node";
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import {
  kongServiceManagerReadPluginsAssociatedPermission,
  kongServiceManagerCreateRoutePermission} from "@veecode-platform/backstage-plugin-kong-service-manager-common";

// const kongPermissions = [
//   kongServiceManagerReadServicePermission.name,
//   kongServiceManagerReadPluginsAvailablePermission.name,
//   kongServiceManagerReadPluginsAssociatedPermission.name,
//   kongServiceManagerReadRoutesPermission.name,
//   kongServiceManagerApplyPluginToServicePermission.name,
//   kongServiceManagerUpdatePluginOnTheServicePermission.name,
//   kongServiceManagerDisablePluginFromServicePermission.name,
//   kongServiceManagerCreateRoutePermission.name,
//   kongServiceManagerUpdateRoutePermission.name,
//   kongServiceManagerDeleteRoutePermission.name,
//   kongServiceManagerReadPluginsAvailableForRoutePermission.name,
//   kongServiceManagerApplyPluginsAvailableToRoutePermission.name,
//   kongServiceManagerReadPluginsAssociatedForRoutePermission.name,
//   kongServiceManagerUpdatePluginOnTheRoutePermission.name,
//   kongServiceManagerDisablePluginFromRoutePermission.name,
//   kongServiceManagerReadSpecsPermission.name,
//   kongServiceManagerUpdateSpecPermission.name
// ]

class PermissionModule implements PermissionPolicy {
    async handle(
        request: PolicyQuery,
        _user?: PolicyQueryUser
    ):Promise<PolicyDecision>{
        if(isPermission(request.permission, kongServiceManagerCreateRoutePermission)){
        //  if(kongPermissions.includes(request.permission.name)){
            return {
                result: AuthorizeResult.DENY
            }
        }         
        
        if(isPermission(request.permission, kongServiceManagerReadPluginsAssociatedPermission)){
          //  if(kongPermissions.includes(request.permission.name)){
              return {
                  result: AuthorizeResult.ALLOW
              }
          } 

        return {
            result: AuthorizeResult.ALLOW
        }
    }
}

export default createBackendModule({
    pluginId: 'permission',
    moduleId: 'permission-policy',
    register(reg) {
      reg.registerInit({
        deps: { policy: policyExtensionPoint },
        async init({ policy }) {
          policy.setPolicy(new PermissionModule());
        },
      });
    },
  });