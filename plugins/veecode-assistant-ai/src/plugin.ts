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

export const VeecodeAssistantAiPage = veecodeAssistantAiPlugin.provide(
  createRoutableExtension({
    name: 'VeecodeAssistantAiPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
