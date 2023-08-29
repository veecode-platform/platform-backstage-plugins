import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const gitlabPipelinesPlugin = createPlugin({
  id: 'gitlab-pipelines',
  routes: {
    root: rootRouteRef,
  },
});

export const GitlabPipelinesPage = gitlabPipelinesPlugin.provide(
  createRoutableExtension({
    name: 'GitlabPipelinesPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
