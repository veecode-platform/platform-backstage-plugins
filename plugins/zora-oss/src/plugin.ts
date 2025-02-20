import {
  createPlugin,
  createRoutableExtension,
  createComponentExtension
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const zoraOssPlugin = createPlugin({
  id: 'zora-oss',
  routes: {
    root: rootRouteRef,
  },
});

export const ZoraOssPage = zoraOssPlugin.provide(
  createRoutableExtension({
    name: 'ZoraOssPage',
    component: () =>
      import('./components/PluginPage').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const ZoraOssProjectCard = zoraOssPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () =>
        import('./components/projectVulnerabilities/VulnarabilitiesSummaryCard').then(m => m.VulnerabilitiesSummaryCard),
    },
  }),
)

export const ZoraOssProjectTable = zoraOssPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () =>
        import('./components/projectVulnerabilities/VulnerabilitiesTable').then(m => m.ProjectVulnerabilitiesTable),
    },
  }),
)
