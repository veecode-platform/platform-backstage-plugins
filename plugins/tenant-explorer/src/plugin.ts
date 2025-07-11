import {
  createPlugin,
  createComponentExtension,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const TenantExplorerPlugin = createPlugin({
  id: 'tenant-explorer',
  routes: {
    root: rootRouteRef,
  },
});

export const TenantOverviewPage = TenantExplorerPlugin.provide(
  createComponentExtension({
    name: 'TenantOverviewPage',
    component: {
      lazy: () =>
        import('./components/OverviewPage').then(m => m.TenantOverview),
    },
  }),
);

export const TenantExplorerPage = TenantExplorerPlugin.provide(
  createRoutableExtension({
    name: 'TenantExplorerPage',
    component: () =>
      import('./components/TenantExplorerPage').then(m => m.TenantExplorerPage),
    mountPoint: rootRouteRef,
  }),
);
