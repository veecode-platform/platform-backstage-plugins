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
import { veecodeAssistantAIApiRef } from './api/veeCodeAssistantAIApi';
import { VeeCodeAssistantAIClient } from './api';

export const veecodeAssistantAiPlugin = createPlugin({
  id: 'veecode-assistant-ai',
  routes: {
    root: rootRouteRef,
  },
  apis:[
    createApiFactory({
      api: veecodeAssistantAIApiRef,
      deps: { config: configApiRef, fetchApi: fetchApiRef, githubAuthApi: githubAuthApiRef, gitlabAuthApi: gitlabAuthApiRef },
      factory: ({config, fetchApi, githubAuthApi, gitlabAuthApi}) => {
        return new VeeCodeAssistantAIClient(
          config,
          fetchApi,
          githubAuthApi,
          gitlabAuthApi
        )
      }
    })
  ]
});

export const AssistantAIContent = veecodeAssistantAiPlugin.provide(
  createRoutableExtension({
    name: 'AssistantAIContent',
    component: () =>
      import('./components/assistantAIContent').then(m => m.AssistantAIContent),
    mountPoint: rootRouteRef,
  }),
);