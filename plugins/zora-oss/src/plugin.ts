import {
  createPlugin,
  createRoutableExtension,
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
