import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { InfracostClient, infracostApiRef } from './api';

export const infracostPlugin = createPlugin({
  id: 'infracost',
  apis: [
    createApiFactory({
      api: infracostApiRef,
      deps: { configApi: configApiRef, fetchApi: fetchApiRef},
      factory: ({ configApi, fetchApi}) =>
        new InfracostClient({ configApi, fetchApi}),
    }),
  ],
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
