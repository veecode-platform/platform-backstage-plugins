import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const infracostPlugin = createPlugin({
  id: 'infracost',
  routes: {
    root: rootRouteRef,
  },
});

export const InfracostOverviewPage = infracostPlugin.provide(
  createRoutableExtension({
    name: 'InfracostOverviewPage',
    component: () =>
      import('./components/infracostOverviewPage').then(m => m.InfracostOverviewPage),
    mountPoint: rootRouteRef,
  }),
);
