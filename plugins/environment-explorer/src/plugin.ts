import { createComponentExtension, createPlugin, 
  // createRoutableExtension
 } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const environmentExplorerPlugin = createPlugin({
  id: 'environment-explorer',
  routes: {
    root: rootRouteRef,
  },
});

export const EnvironmentOverview = environmentExplorerPlugin.provide(
  createComponentExtension({
    name: 'EnvironmentOverview',
    component: {
      lazy: () =>
        import('./components/OverviewPage').then(m => m.OverviewPage),
    },
  })
);

export const EnvironmentExplorerPage = environmentExplorerPlugin.provide(
  createComponentExtension({
    name: 'EnvironmentExplorerPage',
    component: {
      lazy: () =>
        import('./components/EnvironmentExplorerPage').then(m => m.EnvironmentExplorerPage),
    },
  })
)

// export const EnvironmentExplorerPage = environmentExplorerPlugin.provide(
//   createRoutableExtension({
//     name: 'EnvironmentExplorerPage',
//     component: () =>
//       import('./components/EnvironmentExplorerPage').then(m => m.EnvironmentExplorerPage),
//     mountPoint: rootRouteRef,
//   }),
// );
