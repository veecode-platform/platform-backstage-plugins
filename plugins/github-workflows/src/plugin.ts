import { createApiFactory, createPlugin, discoveryApiRef, createComponentExtension, createRoutableExtension } from '@backstage/core-plugin-api';
import { scmAuthApiRef } from '@backstage/integration-react';
import { buildRouteRef, rootRouteRef } from './routes';
import { githubWorkflowsApiRef, GithubWorkflowsApiClient } from './api';

export const githubWorkflowsPlugin = createPlugin({
  id: 'githubWorkflows',
  routes: {
    root: rootRouteRef,
    buildRoute: buildRouteRef
  },
  apis: [
    createApiFactory({
      api: githubWorkflowsApiRef,
      deps: { discoveryApi: discoveryApiRef, scmAuthApi: scmAuthApiRef },
      factory: ({discoveryApi, scmAuthApi}) => {
        return new GithubWorkflowsApiClient({
          discoveryApi: discoveryApi,
          scmAuthApi: scmAuthApi
        })
      }
    })
  ]
});

export const GithubWorkflowsOverview = githubWorkflowsPlugin.provide(
  createComponentExtension({
    name: 'GithubWorkflowsOverview',
    component: {
      lazy: () =>
        import('./components/GithubWorkflowsOverview').then(m => m.GithubWorkflowsOverview),
    },
  })
);

export const GithubWorkflowsList = githubWorkflowsPlugin.provide(
  createRoutableExtension({
    name: 'GithubWorkflowsList',
    component: () =>
        import('./components/GitubWorkflowsList').then(m => m.GithubWorkflowsList),
    mountPoint: rootRouteRef,
  })
)

export const GithubWorkflowsCard = githubWorkflowsPlugin.provide(
  createComponentExtension({
    name: 'GithubWorkflowsCard',
    component: {
      lazy: () =>
        import('./components/GithubWorkflowsCards').then(m => m.GithubWorkflowsCards),
    },
  })
)
