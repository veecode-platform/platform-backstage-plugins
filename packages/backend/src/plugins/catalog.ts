import { GithubEntityProvider } from '@backstage/plugin-catalog-backend-module-github';
import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { ClusterEntitiesProcessor, EnvironmentEntitiesProcessor, DatabaseEntitiesProcessor } from "@veecode-platform/plugin-veecode-platform-common";


export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addEntityProvider(
    GithubEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      // optional: alternatively, use scheduler with schedule defined in app-config.yaml
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 1 },
        timeout: { minutes: 3 },
      }),
    }),
  );
  
  builder.addProcessor( new EnvironmentEntitiesProcessor());
  builder.addProcessor( new ClusterEntitiesProcessor());
  builder.addProcessor( new DatabaseEntitiesProcessor());

  builder.addProcessor(new ScaffolderEntitiesProcessor());

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}