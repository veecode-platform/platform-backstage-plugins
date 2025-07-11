/* eslint-disable @backstage/no-undeclared-imports */
import {
  createBackendModule,
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import { BackendDynamicPluginInstaller } from '@backstage/backend-dynamic-feature-service';
import {
  ClusterEntitiesProcessor,
  DatabaseEntitiesProcessor,
  EnvironmentEntitiesProcessor,
  VaultEntitiesProcessor,
} from '../entitiesProcessor';
import { TenantEntitiesProcessor } from '../entitiesProcessor/Tenant';

export const catalogModuleVeeCodeProcessor = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'veecode-platform-processor',
  register(env) {
    env.registerInit({
      deps: {
        catalog: catalogProcessingExtensionPoint,
      },
      async init({ catalog }) {
        catalog.addProcessor(new ClusterEntitiesProcessor());
        catalog.addProcessor(new DatabaseEntitiesProcessor());
        catalog.addProcessor(new EnvironmentEntitiesProcessor());
        catalog.addProcessor(new VaultEntitiesProcessor());
        catalog.addProcessor(new TenantEntitiesProcessor());
      },
    });
  },
});

export const dynamicPluginInstaller: BackendDynamicPluginInstaller = {
  kind: 'new',
  install: () => catalogModuleVeeCodeProcessor,
};
