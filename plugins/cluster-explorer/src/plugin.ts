import { createPlugin, createComponentExtension, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const ClusterOverviewPlugin = createPlugin({
  id: 'cluster-explorer',
  routes: {
    root: rootRouteRef,
  },
});

export const ClusterOverviewPage = ClusterOverviewPlugin.provide(
  createComponentExtension({
    name: 'ClusterOverviewPage',
    component: {
      lazy: () =>
        import('./components/OverviewPage').then(m => m.ClusterOverview),
    },
  })
);

export const ClusterExplorerPage = ClusterOverviewPlugin.provide(
  createRoutableExtension({
    name: 'ClusterExplorerPage',
    component: () =>
      import('./components/ClusterExplorerPage').then(m => m.ClusterExplorerPage),
    mountPoint: rootRouteRef,
  }),
)
