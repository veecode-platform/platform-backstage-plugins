import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  identityApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { InfracostClient, infracostApiRef } from './api';

export const infracostPlugin = createPlugin({
  id: 'infracost',
  apis: [
    createApiFactory({
      api: infracostApiRef,
      deps: { configApi: configApiRef, identityApi: identityApiRef},
      factory: ({ configApi, identityApi}) =>
        new InfracostClient({ configApi, identityApi}),
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
