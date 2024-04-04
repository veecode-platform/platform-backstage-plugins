
import { createExternalRouteRef, createRouteRef } from '@backstage/core-plugin-api';

export const rootRoute = createRouteRef({
  id: 'api-explorer',
});

export const registerComponentRouteRef = createExternalRouteRef({
  id: 'register-component',
  optional: true,
});