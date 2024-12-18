import {
  createApiFactory,
  configApiRef,
  fetchApiRef,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { veecodeAssistantAIApiRef } from './api/veeCodeAssistantAIApi';
import { VeeCodeAssistantAIClient } from './api';
import { scmAuthApiRef } from '@backstage/integration-react';

export const veecodeAssistantAiPlugin = createPlugin({
  id: 'veecode-assistant-ai',
  routes: {
    root: rootRouteRef,
  },
  apis:[
    createApiFactory({
      api: veecodeAssistantAIApiRef,
      deps: { config: configApiRef, fetchApi: fetchApiRef, scmAuthApi: scmAuthApiRef },
      factory: ({config, fetchApi, scmAuthApi}) => {
        return new VeeCodeAssistantAIClient(
          config,
          fetchApi,
          scmAuthApi
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