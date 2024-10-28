import { createApiFactory, createComponentExtension, createPlugin, discoveryApiRef, fetchApiRef, gitlabAuthApiRef } from '@backstage/core-plugin-api';
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
      deps: { 
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
        gitlabAuthApi: gitlabAuthApiRef
      },
      factory: ({discoveryApi, fetchApi,gitlabAuthApi}) => {
        return new GitlabPipelinesApiClient({
          discoveryApi: discoveryApi,
          fetchApi: fetchApi,
          gitlabAuthApi: gitlabAuthApi,
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