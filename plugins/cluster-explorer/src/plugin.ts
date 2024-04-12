import { createPlugin, createComponentExtension, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const ClusterExplorerPlugin = createPlugin({
  id: 'cluster-explorer',
  routes: {
    root: rootRouteRef,
  },
});

export const ClusterOverviewPage = ClusterExplorerPlugin.provide(
  createComponentExtension({
    name: 'ClusterOverviewPage',
    component: {
      lazy: () =>
        import('./components/OverviewPage').then(m => m.ClusterOverview),
    },
  })
);

export const ClusterExplorerPage = ClusterExplorerPlugin.provide(
  createRoutableExtension({
    name: 'ClusterExplorerPage',
    component: () =>
      import('./components/ClusterExplorerPage').then(m => m.ClusterExplorerPage),
    mountPoint: rootRouteRef,
  }),
)

export const ClusterInstructionsCard = ClusterExplorerPlugin.provide(
  createComponentExtension({
    name: 'ClusterInstructionCard',
    component: {
      lazy: () =>
        import('./components/InstructionsCard').then(m => m.ClusterInstructionsCard),
    },
  })
);