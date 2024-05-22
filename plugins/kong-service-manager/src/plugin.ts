import { createApiFactory, createPlugin, discoveryApiRef, createRoutableExtension, configApiRef } from '@backstage/core-plugin-api';
import { addPluginRouteRef, pluginsListRouteRef, removePluginRouteRef, kongServiceRouteRef, routesListRouteRef } from './routes';
import { kongServiceManagerApiRef, KongServiceManagerApiClient } from './api';

export const kongServiceManagerPlugin = createPlugin({
  id: 'kong-service-manager',
  routes: {
    root: kongServiceRouteRef,
    routesList: routesListRouteRef,
    pluginsList: pluginsListRouteRef,
    removePlugin: removePluginRouteRef,
    addPlugin: addPluginRouteRef
  },
  apis: [
    createApiFactory({
      api: kongServiceManagerApiRef,
      deps: { discoveryApi: discoveryApiRef, configApi: configApiRef },
      factory: ({discoveryApi, configApi}) => {
        return new KongServiceManagerApiClient({
          discoveryApi: discoveryApi, configApi: configApi
        })
      }
    })
  ]
});

export const KongServiceManagerPage = kongServiceManagerPlugin.provide(
  createRoutableExtension({
    name: 'KongServiceManagerPage',
    component: () =>
      import('./components/KongServiceManagerHomepage').then(m => m.KongServiceManagerHomepage),
    mountPoint: kongServiceRouteRef,
  }),
);
