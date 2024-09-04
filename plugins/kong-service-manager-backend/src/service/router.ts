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

  // Services
  router.get('/services/:serviceName', serviceController.getServiceInfo as RequestHandler);
  // Plugins
  router.get('/plugins', pluginsController.getEnabledPlugins as RequestHandler);
  router.get('/plugins/fields', pluginsController.getPluginFields as RequestHandler);
  router.get('/plugins/associated', pluginsController.getAssociatedPlugins as RequestHandler);
  router.post('/plugins/:serviceName', pluginsController.addPluginToService as RequestHandler);
  router.patch('/plugins/:serviceName', pluginsController.editServicePlugin as RequestHandler);
  router.delete('/plugins/:serviceName', pluginsController.removeServicePlugin as RequestHandler);
  // Routes
  router.get('/routes', routesController.getRoutes as RequestHandler);
  router.get('/routes/:routeId', routesController.routeById as RequestHandler);
  router.post('/routes/:routeId', routesController.createRoute as RequestHandler);
  router.patch('/routes/:routeId', routesController.editRoute as RequestHandler);
  router.delete('/routes/:routeId', routesController.removeRoute as RequestHandler);

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
