
import { createExternalRouteRef, createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'vault-explorer',
});

export const createComponentRouteRef = createExternalRouteRef({
  id: 'create-component',
  optional: true,
});

export const viewTechDocRouteRef = createExternalRouteRef({
  id: 'view-techdoc',
  optional: true,
  params: ['namespace', 'kind', 'name'],
});

export const createFromTemplateRouteRef = createExternalRouteRef({
  id: 'create-from-template',
  optional: true,
  params: ['namespace', 'templateName'],
});
