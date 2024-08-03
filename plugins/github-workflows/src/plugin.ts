import { createApiFactory, createPlugin, createRoutableExtension, configApiRef, createComponentExtension } from '@backstage/core-plugin-api';
import { scmAuthApiRef } from '@backstage/integration-react';
import { buildRouteRef, rootRouteRef } from './routes';
import { githubWorkflowsApiRef, GithubWorkflowsClient } from './api';

/**
 *  @public
 */

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

/**
 *  @public
 */

export const GithubWorkflowsContent = githubWorkflowsPlugin.provide(
  createRoutableExtension({
    name: 'GithubWorkflowsContent',
    component: () =>
        import('./components/GitubWorkflowsContent').then(m => m.GithubWorkflowsContent as any),
    mountPoint: rootRouteRef,
  })
)

/**
 *  @deprecated
 */

export const GithubWorkflowsList = githubWorkflowsPlugin.provide(
  createRoutableExtension({
    name: 'GithubWorkflowsList',
    component: () =>
        import('./@deprecated/components/GitubWorkflowsList').then(m => m.GithubWorkflowsList),
    mountPoint: rootRouteRef,
  })
)

/**
 *  @deprecated
 */

export const GithubWorkflowsCard = githubWorkflowsPlugin.provide(
  createComponentExtension({
    name: 'GithubWorkflowsCard',
    component: {
      lazy: () =>
        import('./@deprecated/components/GithubWorkflowsCards').then(m => m.GithubWorkflowsCards),
    },
  })
)
