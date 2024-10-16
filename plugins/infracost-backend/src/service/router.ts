import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import { DiscoveryService, LoggerService, PermissionsService, AuthService, HttpAuthService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { InfracostStore } from '../database';
import { InputError } from '@backstage/errors';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { infracostPermissions } from '@veecode-platform/backstage-plugin-infracost-common';
import compression from 'compression';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
  database: InfracostStore;
  permissions?: PermissionsService;
  discovery?: DiscoveryService;
  auth?: AuthService;
  httpAuth?: HttpAuthService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {

  const { logger, database, config } = options;
  const router = Router();

  router.use(
      compression({
        threshold: 1024, 
        filter: (req, res) => {
          if (req.headers['x-no-compression']) return false;
          return compression.filter(req, res);
        },
      }),
    );

  router.use(express.json({ limit: "50mb" }));
  router.use(
    express.urlencoded({
      extended: true,
    }),
  );
  router.use(
    createPermissionIntegrationRouter({
      permissions: infracostPermissions
    })
  );

  /**
  * health check
  */

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  /**
  * List ALL Infracost Projects Estimate on the database
  */

  router.get('/', (async (_, response) => {
    const data = await database.listInfracostProjectsEstimate();
    if (!data) {
      throw new InputError('There was an error trying to get Infracost Projects Estimate')
    }
    response.status(200);
    response.json(data)
  }) as RequestHandler);

  /**
  * Get by name
  */
  router.get('/:name', (async (request, response) => {
    const estimateName = request.params.name;
    const data = await database.getInfracostProjectsEstimatebyName(estimateName);

    if (!data) {
      throw new InputError('There was an error trying to get Infracost Projects Estimate')
    }

    response.status(200);
    response.json(data)
  }) as RequestHandler);

  /**
  * Insert / Create a new Infracost Projects Estimate
  */

  router.post('/', (async (request, response) => {
    const newEstimate = request.body;
    const data = await database.createInfracostProjectsEstimate(newEstimate);

    if (!data) {
      throw new InputError("There was an error trying persist Infracost Projects Estimate on database")
    }

    response.status(200);
    response.json(data)

  }) as RequestHandler);

  /**
  * Delete a Infracost Projects Estimate
  */

  router.delete('/:name', (async (request, response) => {
    const estimateName = request.params.name;
    const data = await database.deleteInfracostProjectsEstimate(estimateName);

    if (!data) {
      throw new InputError("There was an error trying to delete the estimate...")
    }

    response.status(204)
    response.json({ status: 204, message: `Infracost Projects Estimate for ${estimateName} was successfully deleted` })
  }) as RequestHandler);

  /**
  * Update a Infracost Projects Estimate
  */

  router.put('/', (async (request, response) => {
    const updatedEstimate = request.body;
    const data = await database.updateInfracostProjectsEstimate(updatedEstimate);

    if (!data) {
      throw new InputError("There was an error trying to update the estimate...")
    }

    response.status(200)
    response.json(data)
  }) as RequestHandler);

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());

  return router;
}
