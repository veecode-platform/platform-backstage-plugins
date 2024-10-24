import { createApiFactory, createComponentExtension, createPlugin, discoveryApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { scmAuthApiRef } from '@backstage/integration-react';
import { rootRouteRef } from './routes';
import { GitlabPipelinesApiClient, gitlabPipelinesApiRef } from './api';

export const gitlabPipelinesPlugin = createPlugin({
  id: 'gitlab-pipelines',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: gitlabPipelinesApiRef,
      deps: { discoveryApi: discoveryApiRef, scmAuthApi: scmAuthApiRef, fetchApi: fetchApiRef},
      factory: ({discoveryApi, scmAuthApi, fetchApi}) => {
        return new GitlabPipelinesApiClient({
          discoveryApi: discoveryApi,
          scmAuthApi: scmAuthApi,
          fetchApi: fetchApi
        })
      }
    })
  ]
});

export const GitlabPipelineList = gitlabPipelinesPlugin.provide(
  createComponentExtension({
    name: 'GitlabPipelineList',
    component: {
      lazy: () =>
        import('./components/GitlabPipelinesList').then(m => m.GitlabPipelinesList),
    },
  })
)

export const GitlabJobs = gitlabPipelinesPlugin.provide(
  createComponentExtension({
    name: 'GitlabJobs',
    component: {
      lazy: () =>
        import('./components/GitlabJobs').then(m => m.GitlabJobs),
    },
  })
)