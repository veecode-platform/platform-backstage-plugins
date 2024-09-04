import { Server } from 'http';
import { Logger } from 'winston';
import { createRouter } from './router';
import { HostDiscovery } from '@backstage/backend-defaults/discovery';
import { createServiceBuilder, loadBackendConfig } from '@backstage/backend-common';


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
    logger.debug('Starting application server...');

    const router = await createRouter({
        logger,
        discovery,
        config
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