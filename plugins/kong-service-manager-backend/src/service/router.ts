import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { KongServiceManagerOptions } from '../utils/types';
import { KongServiceManagerApiClient } from '../api';
import { kongServiceManagerPermissions } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { ServiceController, RoutesController, PluginsController, SpecController } from "../controllers"
import { HandlerCatalogEntity } from '../api/handlerCatalogEntity';

export async function createRouter(
  options: KongServiceManagerOptions,
): Promise<express.Router> {
  const { logger, config } = options;

  const kongServiceManagerApi = new KongServiceManagerApiClient(options);
  const handlerCatalogEntityApi = new HandlerCatalogEntity(options);

  const serviceController = new ServiceController(kongServiceManagerApi);
  const routesController = new RoutesController(kongServiceManagerApi);
  const pluginsController = new PluginsController(kongServiceManagerApi);
  const specController = new SpecController(handlerCatalogEntityApi);

  const router = Router();
  router.use(express.json());

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
  router.patch('/:instanceName/services/:serviceName/plugins/:pluginId', pluginsController.editServicePlugin as RequestHandler);
  router.delete('/:instanceName/services/:serviceName/plugins/:pluginId', pluginsController.removeServicePlugin as RequestHandler); 
  router.get('/:instanceName/services/:serviceName/routes', routesController.getRoutes as RequestHandler);
  router.get('/:instanceName/services/:serviceName/routes/:routeId', routesController.routeById as RequestHandler); 
  router.post('/:instanceName/services/:serviceName/routes', routesController.createRoute as RequestHandler);  
  router.patch('/:instanceName/services/:serviceName/routes/:routeId', routesController.editRoute as RequestHandler); 
  router.delete('/:instanceName/services/:serviceName/routes/:routeId', routesController.removeRoute as RequestHandler); 
  router.get('/:kind/:entityName/specs', specController.getSpecsByEntity as RequestHandler);
  router.get('/spec/:entityName/plugins', specController.getPluginsFromSpec as RequestHandler);
  router.post('/add-plugins/:specName', specController.updateSpec as RequestHandler);

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
