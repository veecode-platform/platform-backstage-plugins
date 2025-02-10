import { createBackendModule } from "@backstage/backend-plugin-api";
// biome-ignore lint/style/useImportType: <explanation>
import { AuthorizeResult, isPermission, PolicyDecision } from "@backstage/plugin-permission-common";
import type { PermissionPolicy, PolicyQuery, PolicyQueryUser } from "@backstage/plugin-permission-node";
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import {
  kongRouteCreatePermission,
  kongApplyPluginToRoutePermission,
  kongAuthPluginsPermission,
  kongAIPluginsPermission,
  kongAnalyticsPluginsPermission,
  kongLoggingPluginsPermission,
  kongSecurityPluginsPermission,
  kongServerlessPluginsPermission,
  kongTrafficPluginsPermission,
  kongTransformPluginsPermission
} from "@veecode-platform/backstage-plugin-kong-service-manager-common";


class PermissionModule implements PermissionPolicy {
    async handle(
        request: PolicyQuery,
        _user?: PolicyQueryUser
    ):Promise<PolicyDecision>{
        if(isPermission(request.permission, kongRouteCreatePermission)){
        //  if(kongPermissions.includes(request.permission.name)){
            return {
                result: AuthorizeResult.ALLOW
            }
        }         
        
        if(isPermission(request.permission, kongApplyPluginToRoutePermission)){
          //  if(kongPermissions.includes(request.permission.name)){
              return {
                  result: AuthorizeResult.ALLOW
              }
          } 

        if(isPermission(request.permission, kongAIPluginsPermission)){
          //  if(kongPermissions.includes(request.permission.name)){
              return {
                  result: AuthorizeResult.DENY
              }
          }
        
          if(isPermission(request.permission, kongAuthPluginsPermission)){
            //  if(kongPermissions.includes(request.permission.name)){
                return {
                    result: AuthorizeResult.DENY
                }
            }
        
          if(isPermission(request.permission, kongAnalyticsPluginsPermission)){
            //  if(kongPermissions.includes(request.permission.name)){
                return {
                   result: AuthorizeResult.DENY
                 }
              }

          if(isPermission(request.permission, kongLoggingPluginsPermission)){
          //  if(kongPermissions.includes(request.permission.name)){
              return {
                  result: AuthorizeResult.DENY
              }
          }
          if(isPermission(request.permission, kongSecurityPluginsPermission)){
            //  if(kongPermissions.includes(request.permission.name)){
                return {
                    result: AuthorizeResult.DENY
                }
            }
        
          if(isPermission(request.permission, kongServerlessPluginsPermission)){
            //  if(kongPermissions.includes(request.permission.name)){
                return {
                   result: AuthorizeResult.DENY
                 }
              }

          if(isPermission(request.permission, kongTrafficPluginsPermission)){
          //  if(kongPermissions.includes(request.permission.name)){
              return {
                  result: AuthorizeResult.ALLOW
              }
          }

          if(isPermission(request.permission, kongTransformPluginsPermission)){
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