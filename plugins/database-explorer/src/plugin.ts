import { createComponentExtension, createPlugin, 
 } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const databaseExplorerPlugin = createPlugin({
  id: 'database-explorer',
  routes: {
    root: rootRouteRef,
  },
});

export const DatabaseOverview = databaseExplorerPlugin.provide(
  createComponentExtension({
    name: 'DatabaseOverview',
    component: {
      lazy: () =>
        import('./components/OverviewPage').then(m => m.OverviewPage),
    },
  })
);

export const DatabaseExplorerPage = databaseExplorerPlugin.provide(
  createComponentExtension({
    name: 'DatabaseExplorerPage',
    component: {
      lazy: () =>
        import('./components/DatabaseExplorerPage').then(m => m.DatabaseExplorerPage),
    },
  })
)
