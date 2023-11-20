import { createPlugin, createComponentExtension, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const ClusterOverviewPlugin = createPlugin({
  id: 'cluster-overview',
  routes: {
    root: rootRouteRef,
  },
});

export const ClusterOverviewPage = ClusterOverviewPlugin.provide(
  createComponentExtension({
    name: 'ClusterOverviewPage',
    component: {
      lazy: () =>
        import('./components/ClusterOverview').then(m => m.ClusterOverview),
    },
  })
);

export const ClusterExplorerPage = ClusterOverviewPlugin.provide(
  createRoutableExtension({
    name: 'ClusterExplorerPage',
    component: () =>
      import('./components/cluster-explorer').then(m => m.ClusterExplorerPage),
    mountPoint: rootRouteRef,
  }),
)
