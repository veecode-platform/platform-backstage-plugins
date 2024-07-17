import { GithubEntityProvider } from '@backstage/plugin-catalog-backend-module-github';
import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { ClusterEntitiesProcessor, EnvironmentEntitiesProcessor, DatabaseEntitiesProcessor, VaultEntitiesProcessor, /* FinOpsEntitiesProcessor */ } from "@veecode-platform/plugin-veecode-platform-common";
import { InfracostEntityProcessor, InfracostEntityProvider } from '@veecode-platform/backstage-plugin-infracost-backend';
import { GitlabFillerProcessor } from '@immobiliarelabs/backstage-plugin-gitlab-backend';
import { GitlabDiscoveryEntityProvider } from '@backstage/plugin-catalog-backend-module-gitlab';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  
  const builder = await CatalogBuilder.create(env);
  const cacheService = env.cache.getClient();

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

  builder.addEntityProvider(
    ...GitlabDiscoveryEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      scheduler: env.scheduler,
      /* schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 10 },
        timeout: { minutes: 3 },
      }),*/      
    }),
  );
  builder.addProcessor(new GitlabFillerProcessor(env.config));

  // start infracost config 
    const infracostEntityProviders = InfracostEntityProvider.fromConfig(env.config, {
      id: 'default',
      logger: env.logger,
      cache: cacheService,
      database: env.database,
      schedule: env.scheduler.createScheduledTaskRunner({
           frequency: {minutes: 30},
           timeout: {minutes: 1},
           initialDelay: {seconds: 15}
      }),
   });
  
    builder.addEntityProvider(
      infracostEntityProviders,
    );
      
  const infracostProcessor = new InfracostEntityProcessor(env.config, env.logger, cacheService)
  builder.addProcessor(infracostProcessor)

  // end infracost config
  
  builder.addProcessor( new EnvironmentEntitiesProcessor());
  builder.addProcessor( new ClusterEntitiesProcessor());
  builder.addProcessor( new DatabaseEntitiesProcessor());
  builder.addProcessor( new VaultEntitiesProcessor());
  // builder.addProcessor( new FinOpsEntitiesProcessor());



  builder.addProcessor(new ScaffolderEntitiesProcessor());

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}