import { CatalogClient } from '@backstage/catalog-client';
import { /* createBuiltinActions */ createRouter } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
// import { ScmIntegrations } from '@backstage/integration';
// import { parseJsonAction,createFileAction } from '@veecode-platform/backstage-plugin-scaffolder-backend-module-veecode-extensions';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
 //  const integrations = ScmIntegrations.fromConfig(env.config);

  // const actions = [
  //   parseJsonAction(),
  //   createFileAction(),
  //   ...createBuiltinActions({
  //     integrations,
  //     config: env.config,
  //     catalogClient,
  //     reader: env.reader,
  //   }),
  // ];


  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    // actions
  });
}