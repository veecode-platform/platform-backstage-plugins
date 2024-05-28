import { createApiFactory, createPlugin, discoveryApiRef, createRoutableExtension } from '@backstage/core-plugin-api';
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
      deps: { discoveryApi: discoveryApiRef },
      factory: ({discoveryApi}) => {
        return new KongServiceManagerApiClient({
          discoveryApi: discoveryApi
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
