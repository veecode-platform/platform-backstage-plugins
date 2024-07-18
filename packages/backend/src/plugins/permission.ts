import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
import { createRouter } from '@backstage/plugin-permission-backend';
import { AuthorizeResult, PolicyDecision } from '@backstage/plugin-permission-common';
import { PermissionPolicy, PolicyQuery} from '@backstage/plugin-permission-node';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { Config } from '@backstage/config';

class DefaultPermissionPolicy implements PermissionPolicy {
  config: Config;
  constructor(config: Config) {
    this.config = config;   
  }
  async handle(request: PolicyQuery, user?: BackstageIdentityResponse): Promise<PolicyDecision> {
    if (request.permission.name === 'apiManagement.access.read' && !this.config.getBoolean("platform.apiManagement.enabled") ) return { result: AuthorizeResult.DENY };    
    if (request.permission.name === 'admin.access.read' && user?.identity.userEntityRef.split(":")[0] === "user") return { result: AuthorizeResult.DENY };
    
    return { result: AuthorizeResult.ALLOW };
  }
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    config: env.config,
    logger: env.logger,
    discovery: env.discovery,
    policy: new DefaultPermissionPolicy(env.config),
    identity: env.identity,
  });
}