import Knex from 'knex';
import { DatabaseInfracostStore } from '../database';
import {
    createServiceBuilder,
    loadBackendConfig,
    useHotMemoize
}from '@backstage/backend-common';
import { Server } from 'http';
import { Logger } from 'winston';
import { createRouter } from './router';

export interface ServerOptions {
    port: number;
    enableCors: boolean;
    logger: Logger;
  }
  

export async function startStandaloneServer(
    options: ServerOptions
): Promise<Server> {
    const logger = options.logger.child({
        service: 'infracost-estimate'
    });

    const config = await loadBackendConfig({ logger, argv: process.argv });

    const database = useHotMemoize(module, () => {
        return Knex(config.get('backend.database'));
      });
    
    const db = await DatabaseInfracostStore.create({database: { getClient: async () => database },logger});
    
    logger.debug('Starting application server...');

    const router = await createRouter({
        logger,
        database:db,
        config
    });
    
    let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/infracost-estimate', router);
    
    if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
    }

    return await service.start().catch(err => {
        logger.error(err);
        process.exit(1);
    });

}

module.hot?.accept();