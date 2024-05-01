import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'github-workflows',
});

export const buildRouteRef = createSubRouteRef({
  id: 'github-workflows/build',
  path: '/:id',
  parent: rootRouteRef,
});