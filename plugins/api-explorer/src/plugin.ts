/* eslint-disable @backstage/no-undeclared-imports */
import { createApiFactory, createComponentExtension, createPlugin, createRoutableExtension, 
 } from '@backstage/core-plugin-api';
import { registerComponentRouteRef, rootRoute } from './routes';
import { apiExplorerConfigRef } from './config';
import { defaultDefinitionWidgets } from '@backstage/plugin-api-docs'
import { ApiEntity } from '@backstage/catalog-model';

export const apiExplorerPlugin = createPlugin({
  id: 'api-explorer',
  routes: {
    root: rootRoute,
  },
  apis: [
    createApiFactory({
      api: apiExplorerConfigRef,
      deps: {},
      factory: () => {
        const definitionWidgets = defaultDefinitionWidgets();
        return {
          getApiDefinitionWidget: (apiEntity: ApiEntity) => {
            return definitionWidgets.find(d => d.type === apiEntity.spec.type);
          },
        };
      },
    }),
  ],
  externalRoutes: {
    registerApi: registerComponentRouteRef,
  },
});


/** @public */
export const ApiExplorerPage = apiExplorerPlugin.provide(
  createRoutableExtension({
    name: 'ApiExplorerPage',
    component: () =>
      import('./components/ApiExplorerPage').then(m => m.ApiExplorerPage),
    mountPoint: rootRoute,
  }),
);

/** @public */
export const EntityApiDefinitionCard = apiExplorerPlugin.provide(
  createComponentExtension({
    name: 'EntityApiDefinitionCard',
    component: {
      lazy: () =>
        import('@backstage/plugin-api-docs').then(m => m.ApiDefinitionCard),
    },
  }),
);

/** @public */
export const EntityConsumedApisCard = apiExplorerPlugin.provide(
  createComponentExtension({
    name: 'EntityConsumedApisCard',
    component: {
      lazy: () =>
        import('@backstage/plugin-api-docs').then(m => m.ConsumedApisCard),
    },
  }),
);

/** @public */
export const EntityConsumingComponentsCard = apiExplorerPlugin.provide(
  createComponentExtension({
    name: 'EntityConsumingComponentsCard',
    component: {
      lazy: () =>
        import('@backstage/plugin-api-docs').then(
          m => m.ConsumingComponentsCard,
        ),
    },
  }),
);

/** @public */
export const EntityProvidedApisCard = apiExplorerPlugin.provide(
  createComponentExtension({
    name: 'EntityProvidedApisCard',
    component: {
      lazy: () =>
        import('@backstage/plugin-api-docs').then(m => m.ProvidedApisCard),
    },
  }),
);

/** @public */
export const EntityProvidingComponentsCard = apiExplorerPlugin.provide(
  createComponentExtension({
    name: 'EntityProvidingComponentsCard',
    component: {
      lazy: () =>
        import('@backstage/plugin-api-docs').then(
          m => m.ProvidingComponentsCard,
        ),
    },
  }),
);

/** @public */
export const EntityHasApisCard = apiExplorerPlugin.provide(
  createComponentExtension({
    name: 'EntityHasApisCard',
    component: {
      lazy: () => import('@backstage/plugin-api-docs').then(m => m.HasApisCard),
    },
  }),
);