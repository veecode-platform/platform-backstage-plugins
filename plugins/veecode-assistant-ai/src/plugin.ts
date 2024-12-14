import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const veecodeAssistantAiPlugin = createPlugin({
  id: 'veecode-assistant-ai',
  routes: {
    root: rootRouteRef,
  },
});

export const AssistantAIContent = veecodeAssistantAiPlugin.provide(
  createRoutableExtension({
    name: 'AssistantAIContent',
    component: () =>
      import('./components/assistantAIContent').then(m => m.AssistantAIContent),
    mountPoint: rootRouteRef,
  }),
);

export const AIOptions = veecodeAssistantAiPlugin.provide(
  createRoutableExtension({
    name: 'AIOptions',
    component: () =>
      import('./components/assistantAIContent/aImodalComponent/aIContent/aiOptions').then(m => m.AIOptions),
    mountPoint: rootRouteRef,
  })
)
