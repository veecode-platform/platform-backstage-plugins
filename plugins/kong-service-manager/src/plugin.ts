import { createApiFactory, createPlugin, discoveryApiRef, createRoutableExtension, configApiRef } from '@backstage/core-plugin-api';
import { addPluginRouteRef, pluginsListRouteRef, removePluginRouteRef, kongServiceRouteRef, routesListRouteRef } from './@deprecated/src/routes';
import { KongServiceManagerApiClient, kongServiceManagerApiRef } from './api';
import { KongServiceManagerApiClientDeprecated, kongServiceManagerApiDeprecatedRef } from './@deprecated/src/api';


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
      api: kongServiceManagerApiDeprecatedRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({discoveryApi}) => {
        return new KongServiceManagerApiClientDeprecated({
          discoveryApi: discoveryApi
        })
      }
    }),
    createApiFactory({
      api: kongServiceManagerApiRef,
      deps: { config: configApiRef },
      factory: ({config}) => {
        return new KongServiceManagerApiClient({
          config
        })
      }
    })
  ]
});

/**
 *  @deprecated
 * 
 *  The proxy will no longer be used for authentication and instance referencing, we have developed the backend plugin, 
 *  see the full documentation at 👉🏻 [Kong Service Manager Backend Plugin](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/kong-service-manager-backend/README.md)
 *  After following the documentation, now use the **KongServiceManagerContent** component
 */

export const KongServiceManagerPage = kongServiceManagerPlugin.provide(
  createRoutableExtension({
    name: 'KongServiceManagerPage',
    component: () =>
      import('./@deprecated/src/components/KongServiceManagerHomepage').then(m => m.KongServiceManagerHomepage),
    mountPoint: kongServiceRouteRef,
  }),
);

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