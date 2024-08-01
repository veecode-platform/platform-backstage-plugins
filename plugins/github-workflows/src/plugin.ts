import { createApiFactory, createPlugin, createRoutableExtension, configApiRef } from '@backstage/core-plugin-api';
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

export const GithubWorkflowsContent = githubWorkflowsPlugin.provide(
  createRoutableExtension({
    name: 'GithubWorkflowsContent',
    component: () =>
        import('./components/GitubWorkflowsContent').then(m => m.GithubWorkflowsContent as any),
    mountPoint: rootRouteRef,
  })
)

