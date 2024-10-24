import { createBackendModule } from "@backstage/backend-plugin-api";
// biome-ignore lint/style/useImportType: <explanation>
import { AuthorizeResult, isPermission, PolicyDecision } from "@backstage/plugin-permission-common";
import type { PermissionPolicy, PolicyQuery, PolicyQueryUser } from "@backstage/plugin-permission-node";
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import {
  kongCreateRoutePermission,
  kongApplyPluginServicePermission
} from "@veecode-platform/backstage-plugin-kong-service-manager-common";

// const kongPermissions = [
//   kongReadServicePermission.name,
//   kongReadPluginsAvailableServicePermission.name,
//   kongReadRoutesPermission.name,
//   kongApplyPluginServicePermission.name,
//   kongUpdatePluginServicePermission.name,
//   kongDisablePluginServicePermission.name,
//   kongCreateRoutePermission.name,
//   kongUpdateRoutePermission.name,
//   kongDeleteRoutePermission.name,
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
        if(isPermission(request.permission, kongCreateRoutePermission)){
        //  if(kongPermissions.includes(request.permission.name)){
            return {
                result: AuthorizeResult.DENY
            }
        }         
        
        if(isPermission(request.permission, kongApplyPluginServicePermission)){
          //  if(kongPermissions.includes(request.permission.name)){
              return {
                  result: AuthorizeResult.DENY
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