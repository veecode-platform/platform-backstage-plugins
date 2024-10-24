import { Server } from 'http';
import { Logger } from 'winston';
import { createRouter } from './router';
import { HostDiscovery } from '@backstage/backend-defaults/discovery';
import { createLegacyAuthAdapters, createServiceBuilder, loadBackendConfig, ServerTokenManager, } from '@backstage/backend-common';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';
import { AuthService, HttpAuthService } from '@backstage/backend-plugin-api';


export interface ServerOptions {
    port: number;
    enableCors: boolean;
    logger: Logger;
  }
  

export async function startStandaloneServer(
    options: ServerOptions
): Promise<Server> {
    const logger = options.logger.child({
        service: 'kong-service-manager'
    });

    const config = await loadBackendConfig({ logger, argv: process.argv });
    const discovery =  HostDiscovery.fromConfig(config);
    const tokenManager = ServerTokenManager.fromConfig(config, { logger });
    const permissions = ServerPermissionClient.fromConfig(config, {
        discovery,
        tokenManager,
      });
    const { httpAuth,auth } = createLegacyAuthAdapters<
      any,
      { httpAuth: HttpAuthService, auth: AuthService }
    >({
      tokenManager,
      discovery,
    });

    logger.debug('Starting application server...');

    const router = await createRouter({
        logger,
        permissions,
        discovery,
        config,
        auth,
        httpAuth,
    });
    
    let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/kong-service-manager', router);
    
    if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
    }

    return await service.start().catch(err => {
        logger.error(err);
        process.exit(1);
    });

}

module.hot?.accept();