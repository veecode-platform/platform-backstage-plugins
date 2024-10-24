import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { KongServiceManagerOptions } from '../utils/types';
import { KongServiceManagerApiClient } from '../api';
import { kongServiceManagerPermissions } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { ServiceController, RoutesController } from "../controllers"

export async function createRouter(
  options: KongServiceManagerOptions,
): Promise<express.Router> {
  const { logger, config, httpAuth, permissions } = options;

  const kongServiceManagerApi = new KongServiceManagerApiClient(options);

  const serviceController = new ServiceController(kongServiceManagerApi, httpAuth,permissions);
  const routesController = new RoutesController(kongServiceManagerApi,httpAuth,permissions);

  const router = Router();
  router.use(express.json());

  router.use(
    createPermissionIntegrationRouter({
      permissions: Object.values(kongServiceManagerPermissions)
    })
  );

  router.get('/:instanceName/services/:serviceName', serviceController.getServiceInfo as RequestHandler);
  router.get('/:instanceName/plugins', serviceController.getEnabledPlugins as RequestHandler); 
  router.get('/:instanceName/services/plugins/:pluginName/fields', serviceController.getPluginFields as RequestHandler); 
  router.get('/:instanceName/services/:serviceName/plugins/associated', serviceController.getAssociatedPlugins as RequestHandler); 
  router.post('/:instanceName/services/:serviceName/plugins', serviceController.addPluginToService as RequestHandler); 
  router.patch('/:instanceName/services/:serviceName/plugins/:pluginId', serviceController.editServicePlugin as RequestHandler);
  router.delete('/:instanceName/services/:serviceName/plugins/:pluginId', serviceController.removeServicePlugin as RequestHandler); 
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
