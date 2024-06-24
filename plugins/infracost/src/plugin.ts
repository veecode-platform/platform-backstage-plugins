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

export const InfracostPage = infracostPlugin.provide(
  createRoutableExtension({
    name: 'InfracostPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
