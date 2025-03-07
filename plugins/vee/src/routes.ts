import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'vee'
})

export const settingsRouteRef = createSubRouteRef({
  id: 'settings',
  path: '/settings',
  parent: rootRouteRef,
});

export const scaffolderAIRouteRef = createSubRouteRef({
  id: 'scaffolder-ai',
  path: '/scaffolder-ai',
  parent: rootRouteRef,
});