import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'vee'
})

export const veeSettingsRouteRef = createSubRouteRef({
  id: 'settings',
  path: '/settings',
  parent: rootRouteRef,
});

export const veeScaffolderAIRouteRef = createSubRouteRef({
  id: 'scaffolder-ai',
  path: '/scaffolder-ai',
  parent: rootRouteRef,
});