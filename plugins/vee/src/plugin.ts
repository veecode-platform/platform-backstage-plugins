import {
  createApiFactory,
  configApiRef,
  fetchApiRef,
  createPlugin,
  createRoutableExtension,
  gitlabAuthApiRef,
  githubAuthApiRef
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { veeApiRef } from './api/veeApi';
import { VeeClient } from './api';

export const veePlugin = createPlugin({
  id: 'vee',
  routes: {
    root: rootRouteRef,
  },
  apis:[
    createApiFactory({
      api: veeApiRef,
      deps: { config: configApiRef, fetchApi: fetchApiRef, githubAuthApi: githubAuthApiRef, gitlabAuthApi: gitlabAuthApiRef },
      factory: ({config, fetchApi, githubAuthApi, gitlabAuthApi}) => {
        return new VeeClient(
          config,
          fetchApi,
          githubAuthApi,
          gitlabAuthApi
        )
      }
    })
  ]
});

export const AssistantAIContent = veePlugin.provide(
  createRoutableExtension({
    name: 'AssistantAIContent',
    component: () =>
      import('./components/assistantAIContent').then(m => m.AssistantAIContent),
    mountPoint: rootRouteRef,
  }),
);