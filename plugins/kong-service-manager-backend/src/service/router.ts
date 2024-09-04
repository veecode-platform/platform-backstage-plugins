import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { KongServiceManagerOptions } from '../utils/types';
import { KongServiceManagerApiClient } from '../api';
// import { kongServiceManagerPermissions } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
// import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { RoutesController } from '../controllers/routesController';
import { PluginsController } from '../controllers/pluginsController';
import { ServiceController } from '../controllers/serviceController';
import { resolve as resolvePath } from 'path';


export async function createRouter(
  options: KongServiceManagerOptions,
): Promise<express.Router> {
  const { logger, config } = options;
  
  const kongServiceManagerApi = new KongServiceManagerApiClient(options);

  const serviceController = new ServiceController(kongServiceManagerApi);
  const routesController = new RoutesController(kongServiceManagerApi);
  const pluginsController = new PluginsController(kongServiceManagerApi);

  const router = Router();
  router.use(express.json());
  const assetsPath = resolvePath('/view/assets');
  router.use('/assets', express.static(assetsPath));
  // router.use(
  //   createPermissionIntegrationRouter({
  //     permissions: kongServiceManagerPermissions
  //   })
  // );

  router.get('/services/:serviceName', serviceController.getServiceInfo as RequestHandler);
  router.get('/services/:serviceName/plugins', pluginsController.getEnabledPlugins as RequestHandler);
  router.get('/services/plugins/fields', pluginsController.getPluginFields as RequestHandler);
  router.get('/services/:serviceName/plugins/associated', pluginsController.getAssociatedPlugins as RequestHandler);
  router.post('/services/:serviceName/plugins', pluginsController.addPluginToService as RequestHandler);
  router.patch('/services/:serviceName/plugins', pluginsController.editServicePlugin as RequestHandler);
  router.delete('/services/:serviceName/plugins', pluginsController.removeServicePlugin as RequestHandler);
  router.get('/services/:serviceName/routes', routesController.getRoutes as RequestHandler);
  router.get('/services/:serviceName/routes/:routeId', routesController.routeById as RequestHandler);
  router.post('/services/:serviceName/routes/:routeId', routesController.createRoute as RequestHandler);
  router.patch('/services/:serviceName/routes/:routeId', routesController.editRoute as RequestHandler);
  router.delete('/services/:serviceName/routes/:routeId', routesController.removeRoute as RequestHandler);

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
