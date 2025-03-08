import {
  createApiFactory,
  configApiRef,
  fetchApiRef,
  createPlugin,
  gitlabAuthApiRef,
  githubAuthApiRef,
  createComponentExtension,
  createRoutableExtension
} from '@backstage/core-plugin-api';

import {rootRouteRef, veeScaffolderAIRouteRef, veeSettingsRouteRef } from './routes';
import { veeApiRef } from './api/veeApi';
import { VeeClient } from './api';

export const veePlugin = createPlugin({
  id: 'vee',
  routes: {
    root: rootRouteRef,
    settings: veeSettingsRouteRef,
    scaffolderAI: veeScaffolderAIRouteRef
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
    createComponentExtension({
      name: 'AssistantAIContent',
      component: {
        lazy: () =>
          import('./components/assistantAIContent').then(m => m.AssistantAIContent),
      },
    })
  );

export const AssistantAIMenu = veePlugin.provide(
  createComponentExtension({
    name: 'AssistantAIMenu',
    component: {
      lazy: () => 
        import('./components/assistantAIMenu').then(m => m.AssistantAIMenu),
    }
  })
);

export const VeeHomepage = veePlugin.provide(
  createRoutableExtension({
    name: 'VeeHomepage',
    component: () =>
      import('./components/veeHomepage').then(m => m.VeeHomepage as any),
    mountPoint: rootRouteRef,
  })
);