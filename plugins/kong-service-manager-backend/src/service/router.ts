import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { KongServiceManagerOptions } from '../utils/types';
import { KongServiceManagerApiClient } from '../api';
import { kongServiceManagerPermissions } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { RoutesController } from '../controllers/routesController';
import { PluginsController } from '../controllers/pluginsController';
import { ServiceController } from '../controllers/serviceController';
import path from 'path';
import { resolvePackagePath } from '@backstage/backend-plugin-api';


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

  // static
  const assetsPath = resolvePackagePath('@veecode-platform/plugin-kong-service-manager-backend');
  router.use('/assets', express.static(path.join(assetsPath, '/view/assets')));

  router.use(
    createPermissionIntegrationRouter({
      permissions: kongServiceManagerPermissions
    })
  );

  router.get('/:instanceName/services/:serviceName', serviceController.getServiceInfo as RequestHandler);
  router.get('/:instanceName/plugins', pluginsController.getEnabledPlugins as RequestHandler); 
  router.get('/:instanceName/services/plugins/:pluginName/fields', pluginsController.getPluginFields as RequestHandler); 
  router.get('/:instanceName/services/:serviceName/plugins/associated', pluginsController.getAssociatedPlugins as RequestHandler); 
  router.post('/:instanceName/services/:serviceName/plugins', pluginsController.addPluginToService as RequestHandler); 
  router.patch('/:instanceName/services/:serviceName/plugins/:pluginId', pluginsController.editServicePlugin as RequestHandler); //  ✅
  router.delete('/:instanceName/services/:serviceName/plugins/:pluginId', pluginsController.removeServicePlugin as RequestHandler); 
  router.get('/:instanceName/services/:serviceName/routes', routesController.getRoutes as RequestHandler);
  router.get('/:instanceName/services/:serviceName/routes/:routeId', routesController.routeById as RequestHandler); 
  router.post('/:instanceName/services/:serviceName/routes', routesController.createRoute as RequestHandler);  
  router.patch('/:instanceName/services/:serviceName/routes/:routeId', routesController.editRoute as RequestHandler); 
  router.delete('/:instanceName/services/:serviceName/routes/:routeId', routesController.removeRoute as RequestHandler); 

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
