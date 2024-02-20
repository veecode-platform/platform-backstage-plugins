import { createComponentExtension, createPlugin, 
 } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const vaultExplorerPlugin = createPlugin({
  id: 'vault-explorer',
  routes: {
    root: rootRouteRef,
  },
});

export const VaultOverview = vaultExplorerPlugin.provide(
  createComponentExtension({
    name: 'VaultOverview',
    component: {
      lazy: () =>
        import('./components/OverviewPage').then(m => m.OverviewPage),
    },
  })
);

export const VaultExplorerPage = vaultExplorerPlugin.provide(
  createComponentExtension({
    name: 'VaultExplorerPage',
    component: {
      lazy: () =>
        import('./components/VaultExplorerPage').then(m => m.VaultExplorerPage),
    },
  })
)
