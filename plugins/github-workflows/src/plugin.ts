import { createApiFactory, createPlugin, discoveryApiRef, createComponentExtension, identityApiRef } from '@backstage/core-plugin-api';
import { scmAuthApiRef } from '@backstage/integration-react';
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
      deps: { discoveryApi: discoveryApiRef, scmAuthApi: scmAuthApiRef, identityApi: identityApiRef },
      factory: ({discoveryApi, scmAuthApi, identityApi}) => {
        return new GithubWorkflowsApiClient({
          discoveryApi: discoveryApi,
          scmAuthApi: scmAuthApi,
          identityAPi: identityApi
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
  createComponentExtension({
    name: 'GithubWorkflowsList',
    component: {
      lazy: () =>
        import('./components/GitubWorkflowsList').then(m => m.GithubWorkflowsList),
    },
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