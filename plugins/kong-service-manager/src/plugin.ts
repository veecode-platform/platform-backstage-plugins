import { createApiFactory, createPlugin, createRoutableExtension, configApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { KongServiceManagerApiClient, kongServiceManagerApiRef } from './api';
import { addPluginRouteRef, kongServiceRouteRef, pluginsListRouteRef, removePluginRouteRef, routesListRouteRef, sepcsListRouteRef } from './routes';
import { scmAuthApiRef, scmIntegrationsApiRef } from '@backstage/integration-react';


export const kongServiceManagerPlugin = createPlugin({
  id: 'kong-service-manager',
  routes: {
    root: kongServiceRouteRef,
    routesList: routesListRouteRef,
    pluginsList: pluginsListRouteRef,
    removePlugin: removePluginRouteRef,
    addPlugin: addPluginRouteRef,
    allSpecs: sepcsListRouteRef
  },
  apis: [
    createApiFactory({
      api: kongServiceManagerApiRef,
      deps: { config: configApiRef, fetchApi: fetchApiRef, scmAuthApi: scmAuthApiRef, scmIntegrationsApi: scmIntegrationsApiRef },
      factory: ({config, fetchApi, scmAuthApi, scmIntegrationsApi}) => {
        return new KongServiceManagerApiClient({
          config,
          fetchApi,
          scmAuthApi,
          scmIntegrationsApi
        })
      }
    })
  ]
});

/**
 *  @public
 */

export const KongServiceManagerContent = kongServiceManagerPlugin.provide(
  createRoutableExtension({
    name: 'KongServiceManagerContent',
    component: () =>
      import('./components/KongServiceManagerHomepage').then(m => m.KongServiceManagerHomepage),
    mountPoint: kongServiceRouteRef,
  }),
);