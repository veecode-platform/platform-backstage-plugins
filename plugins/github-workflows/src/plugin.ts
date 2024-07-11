import { createApiFactory, createPlugin, createComponentExtension, createRoutableExtension, configApiRef } from '@backstage/core-plugin-api';
import { scmAuthApiRef } from '@backstage/integration-react';
import { buildRouteRef, rootRouteRef } from './routes';
import { githubWorkflowsApiRef, GithubWorkflowsClient } from './api';

export const githubWorkflowsPlugin = createPlugin({
  id: 'githubWorkflows',
  apis: [
    createApiFactory({
      api: githubWorkflowsApiRef,
      deps: { configApi: configApiRef, scmAuthApi: scmAuthApiRef },
      factory: ({configApi, scmAuthApi}) => {
        return new GithubWorkflowsClient({configApi,scmAuthApi})
      }
    })
  ],
  routes: {
    root: rootRouteRef,
    buildRoute: buildRouteRef
  }
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
