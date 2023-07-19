import { createApiFactory, createRoutableExtension, createPlugin, discoveryApiRef } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';
import { githubWorkflowsApiRef, GithubWorkflowsApiClient } from './api';

export const githubWorkflowsPlugin = createPlugin({
  id: 'githubWorkflows',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: githubWorkflowsApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({discoveryApi}) => {
        return new GithubWorkflowsApiClient({
          discoveryApi: discoveryApi
        })
      }
    })
  ]
});

export const GithubWorkflowsPage = githubWorkflowsPlugin.provide(
  createRoutableExtension({
    name: 'GithubWorkflowsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
